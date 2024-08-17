import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import usePackageStore from "@renderer/store";
import Order from "./Order";

function PackagePreview() {
  const { orders } = usePackageStore();
  const { getOrders } = usePackageStore();
  const s3 = new S3Client({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY_ID,
    },
  });

  const handleFileUpload = async () => {
    const orderPackage = getOrders();
    const filesList = orderPackage
      .map((actionsList) => actionsList.attachmentName)
      .filter(attachmentName => attachmentName);
    // TODO: 좀더 세밀한 유효성검증 필요
    if (!filesList || filesList.length === 0) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    try {
      const uploadPromises = filesList.map(async (fileName) => {
        const params = {
          Bucket: import.meta.env.VITE_AWS_BUCKET,
          Key: fileName,
          Body: fileName,
          ACL: "public-read",
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);
      });

      await Promise.all(uploadPromises);
      axios.post(`${import.meta.env.VITE_SERVER_URL}/packages/new`, orderPackage, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    } catch (err) {
      console.error("파일 업로드 중 오류 발생:", err);
    }
  };

  return (
    <div className="relative w-3/5 bg-white px-6 pb-8 pt-10 shadow-sm ring-1 ring-gray-900/5 sm:mr-3 sm:max-w-full sm:rounded-lg sm:px-10">
      <label className="mb-2 block text-xl font-bold text-gray-700">
        패키지 미리보기
      </label>
      <div className="overflow-y-scroll">
        {orders.map((order, index) => (
          <Order key={index} order={order} index={index} />
        ))}
      </div>
      <button
        className="absolute bottom-3 right-5 my-3 rounded bg-blue-500 px-6 py-3 text-xl font-bold text-white hover:bg-blue-700"
        onClick={handleFileUpload}>
        패키징하기
      </button>
    </div>
  );
}

export default PackagePreview;
