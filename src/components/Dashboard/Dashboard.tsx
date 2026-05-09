import { useState } from "react";
import ExplorerNode from "./components/ExplorerNode/ExplorerNode";

export type Node = {
  id: string;
  name: string;
  type: string;
  children: Node[];
};

const FILE_SYSTEM_DATA = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          {
            id: "3",
            name: "Button.js",
            type: "file",
          },
        ],
      },
      {
        id: "4",
        name: "components",
        type: "folder",
        children: [],
      },
    ],
  },
  {
    id: "5",
    name: "README.md",
    type: "file",
  },
  {
    id: "6",
    name: "README.md",
    type: "file",
  },
  {
    id: "7",
    name: "EmptyFolder",
    type: "folder",
  },
];

const Dashboard = () => {
  const [fileSystemData, setFileSystemData] = useState(FILE_SYSTEM_DATA);

  return (
    <div className="flex flex-col gap-2 p-5 bg-white h-screen w-screen">
      {fileSystemData.map((sysData) => (
        <ExplorerNode data={sysData} key={sysData.id} />
      ))}
    </div>
  );
};

export default Dashboard;
