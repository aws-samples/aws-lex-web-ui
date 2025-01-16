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
        { label: "Connect", icon: "connect_without_contact" },
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
  /* position: fixed; */
  bottom: 10px;
  width: 100%;
}

.tabs {
  display: flex;
  background-color: #4caf50;
  border-radius: 20px;
  padding: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 20px;
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
  font-size: 14px;
  text-transform: capitalize;
}
</style>
