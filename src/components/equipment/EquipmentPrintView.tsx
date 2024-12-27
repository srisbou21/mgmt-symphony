import { Equipment } from "@/types/equipment";

interface EquipmentPrintViewProps {
  equipments: Equipment[];
}

export const EquipmentPrintView = ({ equipments }: EquipmentPrintViewProps) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Liste des Équipements</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">N° Série</th>
            <th className="border p-2">N° Inventaire</th>
            <th className="border p-2">Statut</th>
            <th className="border p-2">Emplacement</th>
            <th className="border p-2">Qté Dispo</th>
            <th className="border p-2">Qté Min</th>
            <th className="border p-2">Observation</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment.id}>
              <td className="border p-2">{equipment.name}</td>
              <td className="border p-2">{equipment.type}</td>
              <td className="border p-2">{equipment.serialNumbers.map(sn => sn.number).join(', ')}</td>
              <td className="border p-2">{equipment.serialNumbers.map(sn => sn.inventoryNumber).join(', ')}</td>
              <td className="border p-2">{equipment.status}</td>
              <td className="border p-2">{equipment.location}</td>
              <td className="border p-2">{equipment.availableQuantity}</td>
              <td className="border p-2">{equipment.minQuantity}</td>
              <td className="border p-2">{equipment.observation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};