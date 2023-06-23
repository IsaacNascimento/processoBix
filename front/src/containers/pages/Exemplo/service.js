class DataService {
  getItems() {
    const data = localStorage.getItem("exempleData");
    return data ? JSON.parse(data) : [];
  }

  getItemById(id) {
    const data = this.getItems();
    const index = data.map((item) => item.id).indexOf(id);
    const element = data[index];
    return element ? element : {};
  }

  create(data) {
    const values = this.getItems();
    values.push(data);
    localStorage.setItem("exempleData", JSON.stringify(values));
  }

  editar(values, id) {
    const data = this.getItems();
    const index = data.map((item) => item.id).indexOf(id);
    data.splice(index, 1, values);
    localStorage.setItem("exempleData", JSON.stringify(data));
  }

  apagar(id) {
    const values = this.getItems();
    const removedItem = values.filter((item) => item.id !== id);
    localStorage.setItem("exempleData", JSON.stringify(removedItem));
  }
}

export default new DataService();
