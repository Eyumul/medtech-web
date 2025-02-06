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
    await useFetch('/api/memberHandler', {
      method: 'POST',
      body: memberData,
    });
    fetchMembers();
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
