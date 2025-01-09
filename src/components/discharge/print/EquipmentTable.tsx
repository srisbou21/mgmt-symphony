import { Equipment } from "@/types/equipment";
import { DischargeItem } from "@/types/discharge";

interface EquipmentTableProps {
  equipments: Equipment[];
  items: DischargeItem[];
  showState?: boolean;
}

export const EquipmentTable = ({ equipments, items, showState = false }: EquipmentTableProps) => {
  return (
    <div className="mt-4">
      <div className="border border-black">
        <div className="bg-gray-100 p-2 border-b border-black">
          <h2 className="text-center font-bold">CARACTERISTIQUES DU MATERIELS / OUTILLAGE{showState ? " RESTITUÉ" : ""}</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-black">
              <th className="border-r border-black p-2 text-left">Qte</th>
              <th className="border-r border-black p-2 text-left">Désignation</th>
              <th className="border-r border-black p-2 text-left">Type</th>
              <th className="border-r border-black p-2 text-left">Catégorie</th>
              {showState && <th className="border-r border-black p-2 text-left">État</th>}
              <th className="p-2 text-left">Observation</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const equipment = equipments.find(e => e.id === item.equipmentId);
              if (!equipment) return null;

              return (
                <tr key={index} className="border-b border-black">
                  <td className="border-r border-black p-2">{item.quantity}</td>
                  <td className="border-r border-black p-2">{equipment.name}</td>
                  <td className="border-r border-black p-2">{equipment.type}</td>
                  <td className="border-r border-black p-2">{equipment.category}</td>
                  {showState && <td className="border-r border-black p-2">{"Bon état"}</td>}
                  <td className="p-2">
                    {equipment.observation || '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};