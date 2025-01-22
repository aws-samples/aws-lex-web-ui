<template>
  <div class="tab-container">
    <!-- Forms -->
    <div v-if="activeTab !== null">
      <div v-if="activeTab === 0">
        <div v-if="!isMenuModalOpen">
          <chat @toggle-menu-modal="toggleMenuModal" @close-form="closeForm" />
        </div>
        <div v-if="isMenuModalOpen">
          <menu-list
            :is-menu-modal-open="isMenuModalOpen"
            @set-active-tab="setActiveTab"
            @toggle-menu-modal="toggleMenuModal"
          />
        </div>
      </div>
      <div v-if="activeTab === 1">
        <call-and-text-form :active-tab="activeTab" @close-form="closeForm" />
      </div>
      <div v-if="activeTab === 2">
        <call-and-text-form :active-tab="activeTab" @close-form="closeForm" />
      </div>
      <div v-if="activeTab === 3">
        <email-form @close-form="closeForm" />
      </div>
    </div>
    <!-- Tabs -->
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item"
        :class="{ active: activeTab === index }"
        @click="setActiveTab(index)"
      >
        <span class="material-icons tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CallAndTextForm from "@/components/CallAndTextForm";
import EmailForm from "@/components/EmailForm";
import Chat from "@/components/Chat1";
import MenuList from "@/components/MenuList";
export default {
  components: {
    CallAndTextForm,
    EmailForm,
    Chat,
    MenuList,
  },
  data() {
    return {
      activeTab: 0,
      isMenuModalOpen: false, // Default: no tab is active
      tabs: [
        { label: "Chat", icon: "connect_without_contact" },
        { label: "Call", icon: "call" },
        { label: "Text", icon: "chat" },
        { label: "Email", icon: "email" },
      ],
    };
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index; // Set the clicked tab as active
      this.isMenuModalOpen = false;
    },
    closeForm(index) {
      this.activeTab = index ?? 0; // Reset the active tab to close the form
    },
    toggleMenuModal() {
      this.isMenuModalOpen = !this.isMenuModalOpen;
    },
  },
};
</script>

<style scoped>
/* Styling for Tabs */
.tab-container {
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.lex-web-ui-iframe {
  .tab-container {
    height: 720px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .tab-container + div {
    height: 100%;
  }
  .tab-container + div + div {
    height: 100%;
  } 
}

.tabs {
  display: flex;
  background-color: #50a357;
  border-radius: 0;
  width: 100%;
  height: 60px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 16px 10px 10px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 0;
}

.tab-item:first-child {
  border-top-left-radius: 10px;
}

.tab-item:last-child {
  border-top-right-radius: 10px;
}

.tab-item:not(:last-child) {
  border-right: 1px solid #e0e0e0;
}

.tab-item:not(.active):hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.tab-item.active {
  background-color: #2e7d32;
}

.tab-icon {
  font-size: 20px;
  margin-right: 8px;
}

.tab-label {
  font-size: 16px;
  text-transform: capitalize;
}
</style>
