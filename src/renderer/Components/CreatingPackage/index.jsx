import { useEffect } from "react";
import CreatingOrder from "./CreatingOrder";
import PackagePreview from "./PackagePreview";
import usePackageStore from "../../store";

function CreatingPackage() {
  const { clearOrder } = usePackageStore();

  useEffect(() => {
    return () => clearOrder();
  }, [clearOrder]);

  return (
    <div className="relative flex min-h-fit flex-1 flex-row items-stretch bg-gray-light px-3 py-6">
      <CreatingOrder />
      <PackagePreview />
    </div>
  );
}

export default CreatingPackage;
