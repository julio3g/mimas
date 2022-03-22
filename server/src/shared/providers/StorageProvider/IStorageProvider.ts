interface IStorageProvider {
  save(file: string, folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
  update(id: string, folder: string): Promise<string>;
}

export { IStorageProvider };
