interface OrderType {
  action: string;
  attachmentFile?: File;
  attachmentName: string;
  attachmentType: string;
  attachmentUrl: string;
  sourcePath: string;
  executionPath: string;
  editingName: string;
  useVscode: boolean;
}

interface CustomFile extends Blob {
  name: string;
  path: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface AttachmentFile {
  attachmentName: string;
  fileObj?: CustomFile;
  relativePath: string;
}

interface OpenFolderDialogTypes {
  folderPaths: string;
  attachmentName: string;
}

interface api {
  openFileDialog: (action: string) => Promise<AttachmentFile>;
  getAttachmentName: (path: string) => Promise<string>;
  openFolderDialog: () => Promise<OpenFolderDialogTypes>;
  downloadFile: (order: OrderType) => Promise<string>;
  moveFile: (order: OrderType) => Promise<string>;
  replicateFile: (order: OrderType) => Promise<string>;
  editFileName: (order: OrderType) => Promise<string>;
  executeFile: (order: OrderType) => Promise<string>;
  deleteFile: (order: OrderType) => Promise<string>;
  unzipFile: (order: OrderType) => Promise<string>;
  startKakaoLogin: () => Promise<void>;
  onKakaoAuthCode: (callback: (code: string) => void) => void;
}

interface Window {
  api: api;
}
