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

interface ElectronAPI {
  openFileDialog: (action: string) => Promise<AttachmentFile>;
  getAttachmentName: (path: string) => string;
  openFolderDialog: () => OpenFolderDialogTypes;
  downloadFile: (order: OrderType) => string;
  moveFile: (order: OrderType) => string;
  replicateFile: (order: OrderType) => string;
  editFileName: (order: OrderType) => string;
  executeFile: (order: OrderType) => string;
  deleteFile: (order: OrderType) => string;
  unzipFile: (order: OrderType) => string;
}

interface Window {
  electronAPI: ElectronAPI;
}
