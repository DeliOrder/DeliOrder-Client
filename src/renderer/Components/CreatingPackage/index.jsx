import CreatingOrder from "./CreatingOrder";
import PackagePreview from "./PackagePreview";

function CreatingPackage() {
  return (
    <div className="bg-gray-light relative flex min-h-fit flex-1 flex-row items-stretch px-3 py-6">
      <CreatingOrder />
      <PackagePreview />
    </div>
  );
}

export default CreatingPackage;
