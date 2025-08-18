"use client";
import { DataTable } from "@/components/datatables";
import { buildColumns } from "@/components/datatables/columns";
import { Delete, Edit2, PlusCircle } from "lucide-react";

const PageTest = () => {
  const data = [
    {
      id: "65652652652652",
      nom: "bassirou",
      prenom: "fofana",
      poste: "developpeur",
      adresse: "kalaban-coura"
    },
    {
      id: "fghfh52626",
      nom: "Oumar",
      prenom: "Ali",
      poste: "Assistance",
      adresse: "Aci 200"
    },
    {
      id: "dfgdf8456dfgdg",
      nom: "Awa",
      prenom: "Koné",
      poste: "Etudiant",
      adresse: "Niamakoro"
    },
    {
      id: "ht8dfd59865",
      nom: "Moussa",
      prenom: "Coulibaly",
      poste: "Chauffeur",
      adresse: "Niamakoro"
    }
  ];
  const columns = buildColumns(data);

  return (
    <div className="p-9">
      page test
      <DataTable
        columns={columns}
        data={data}
        searchId="poste"
        searchPlaceholder="Rechercher le poste"
        selectlinks={[
          {
            name: "add",
            icon: <PlusCircle />,
            lien: "/person/add",
            className: "bg-blue-500 hover:bg-blue-400"
          },
          { name: "editer", icon: <Edit2 />, lien: "person/edite" },
          {
            name: "delete",
            icon: <Delete />,
            lien: "/person/delete",
            className: "bg-red-600 hover:bg-red-500"
          }
        ]}
      />
    </div>
  );
};

export default PageTest;
