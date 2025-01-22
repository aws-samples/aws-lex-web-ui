<template>
  <div v-if="isMenuModalOpen" class="modal-overlay">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header">
        <h2>Chat</h2>
        <button @click="closeModal" class="close-button">×</button>
      </div>

      <!-- Menu Items -->
      <div class="menu-items">
        <button @click="setTab(2)" class="menu-item" >
          <span class="icon material-icons">chat</span>
          Text With Us
        </button>
        <div  class="divider"></div>

        <button @click="setTab(1)" class="menu-item">
          <span class="icon material-icons">call</span>
          Call Me
        </button>
        <div class="divider"></div>

        <button  @click="setTab(3)" class="menu-item">
          <span class="icon material-icons">email</span>
          Email Us
        </button>
        <div class="divider"></div>

        <button class="menu-item">
          <span class="icon material-icons">search</span>
          Search Website
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuList",
  props: {
    isMenuModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("toggleMenuModal", "Close modal");
    },
    setTab(tab) {
      this.$emit("setActiveTab", tab);
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  /* position: fixed;
  top: 0;
  left: 0;
  bottom: 10; */
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
  margin-bottom: 10px;

}

.modal-content {
  background-color: #f9f9f9;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  /* border-radius: 8px; */
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.menu-items {
  padding: 10px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 20px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  color: #333;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.icon {
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.divider {
  height: 1px;
  background-color: #ddd;
  margin: 5px 20px;
}
</style>
