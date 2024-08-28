import CreatingOrder from "./CreatingOrder";
import PackagePreview from "./PackagePreview";

function CreatingPackage() {
  return (
    <div className="relative flex min-h-max flex-row justify-start justify-items-stretch overflow-hidden bg-blue-100 px-3 py-6 sm:py-12">
      <CreatingOrder />
      <PackagePreview />
    </div>
  );
}

export default CreatingPackage;
