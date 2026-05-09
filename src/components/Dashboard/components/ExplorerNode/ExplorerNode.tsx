import { useState } from "react";

const ExplorerNode = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isFolder = data.type === "folder";

  const isEmptyFolder = isFolder && !data.children?.length;

  const renderArrows = () => {
    if (isEmptyFolder) return null;

    return <span className="mr-2">{isExpanded ? "-" : "+"}</span>;
  };

  return (
    <div className={`ml-4 `}>
      <div
        onClick={() => isFolder && setIsExpanded((prev) => !prev)}
        className={`${isFolder && !isEmptyFolder ? "cursor-pointer" : "cursor-text"} text-black text-lg flex gap-2`}
      >
        {isFolder ? renderArrows() : <input type="checkbox" />}

        {data.name}
      </div>

      <div className={`${isExpanded ? "border-l border-black" : ""}`}>
        {isFolder &&
          isExpanded &&
          data.children?.map((childSysData) => (
            <ExplorerNode data={childSysData} />
          ))}
      </div>
    </div>
  );
};

export default ExplorerNode;
