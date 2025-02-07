import { ref } from 'vue';
import { useFetch } from '#app';

export const useMembers = () => {
  const members = ref([]);

  const fetchMembers = async () => {
    await useFetch('/api/getMembers').then(({ data }) => {
      members.value = data.value?.members || [];
    });
  };

  const addMember = async (memberData) => {
    const { data, error } = await useFetch('/api/memberHandler', {
      method: 'POST',
      body: memberData,
    });
  
    if (error.value) {
      console.error("Error adding member:", error.value);
  
      // Extract a readable error message
      const userErrorMessage = error.value.data?.message || 
                               error.value.statusMessage || 
                               "Something went wrong! Please try again.";
  
      return { error: userErrorMessage };
    }
  
    fetchMembers(); // Refresh members list after adding
    return data.value; // Return the response
  };
  

  const updateMember = async (id, updatedData) => {
    await useFetch(`/api/memberHandler?id=${id}`, {
      method: 'PUT',
      body: updatedData,
    });
    fetchMembers();
  };

  const deleteMember = async (id) => {
    await useFetch(`/api/memberHandler?id=${id}`, {
      method: 'DELETE',
    });
    fetchMembers();
  };

  return {
    members,
    fetchMembers,
    addMember,
    updateMember,
    deleteMember,
  };
};
