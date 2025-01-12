import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PrintTemplate } from '@/types/printTemplate';

interface PdfGeneratorOptions {
  orientation?: 'portrait' | 'landscape';
  format?: 'a4' | 'a3' | 'letter';
  margins?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export class PdfGenerator {
  private doc: jsPDF;
  private template: PrintTemplate;
  private companyName: string;
  private companyLogo?: string;

  constructor(template: PrintTemplate, options: PdfGeneratorOptions = {}) {
    this.doc = new jsPDF({
      orientation: options.orientation || 'portrait',
      format: options.format || 'a4',
      unit: 'mm',
    });
    this.template = template;
    this.companyName = localStorage.getItem('company_name') || 'Company Name';
    this.companyLogo = localStorage.getItem('company_logo') || undefined;
  }

  private async addHeader() {
    if (this.template.header?.showLogo && this.companyLogo) {
      this.doc.addImage(this.companyLogo, 'PNG', 10, 10, 30, 30);
    }

    if (this.template.header?.showCompanyInfo) {
      this.doc.setFontSize(18);
      this.doc.text(this.companyName, 50, 20);
      this.doc.setFontSize(12);
      this.doc.text(localStorage.getItem('company_address') || '', 50, 30);
      this.doc.text(localStorage.getItem('company_phone') || '', 50, 35);
    }

    if (this.template.header?.title) {
      this.doc.setFontSize(16);
      this.doc.text(this.template.header.title, 105, 50, { align: 'center' });
    }
  }

  public addTable(headers: string[], data: any[][]) {
    autoTable(this.doc, {
      head: [headers],
      body: data,
      startY: 70,
      styles: {
        fontSize: 10,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
    });
  }

  private addFooter() {
    const pageCount = this.doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      
      if (this.template.footer?.showSignature) {
        this.doc.line(20, 270, 80, 270);
        this.doc.text('Signature:', 20, 265);
      }

      if (this.template.footer?.customText) {
        this.doc.setFontSize(10);
        this.doc.text(this.template.footer.customText, 105, 280, { align: 'center' });
      }

      if (this.template.footer?.showPageNumbers) {
        this.doc.text(
          `Page ${i} sur ${pageCount}`,
          200,
          290,
          { align: 'right' }
        );
      }
    }
  }

  public async generate(filename: string = 'document.pdf') {
    await this.addHeader();
    this.addFooter();
    this.doc.save(filename);
  }
}