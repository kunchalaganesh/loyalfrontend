import { useSelector } from 'react-redux';

class GetApiService {
  constructor() {
    const allStates = useSelector((state) => state);
    this.adminLoggedIn = allStates.reducer1;
    this.clientCode = this.adminLoggedIn.ClientCode;
  }

  async fetchApi(url) {
    const formData = { ClientCode: this.clientCode };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow to handle it in the component
    }
  }

  async fetchAllCustomers() {
    return await this.fetchApi('a149');
  }

  async fetchAllSkuList() {
    return await this.fetchApi('a163');
  }

  async fetchAllCategories() {
    return await this.fetchApi('a125');
  }

  async fetchAllProductType() {
    return await this.fetchApi('a128');
  }

  async fetchAllPurities() {
    return await this.fetchApi('a134');
  }

  async fetchAllStonesList() {
    return await this.fetchApi('a146');
  }

  async fetchAllDiamondsList() {
    return await this.fetchApi('a153');
  }

  async fetchAllVendorTounche() {
    return await this.fetchApi('a174');
  }

  async fetchAllDiamondSizeWeightRate() {
    return await this.fetchApi('a191');
  }

  async GetAllSizeWeightRate() {
    return await this.fetchApi('getAllSizeWeightRate');
  }

  async fetchAllDiamondAttributes() {
    return await this.fetchApi('a194');
  }

  async fetchAllRDPurchaseList() {
    return await this.fetchApi('a159');
  }

  async fetchPurchaseEntryForBill(idRcvd) {
    const formData = { ClientCode: this.clientCode };
    try {
      const response = await fetch('a159', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const selectedEntry = data.find((x) => x.Id === idRcvd);
      return selectedEntry; // Return the selected entry
    } catch (error) {
      console.error(error);
      throw error; // Rethrow to handle it in the component
    }
  }
}

export default new GetApiService();
