import Http from '@/api/http';

const apiBattle = {
  startBattle: async (data: { battle_level: number; battle_id: string }) => {
    try {
      const res = await Http.post(`/pvp/start`, data);
      return res.data;
    } catch (error) {
      return {
        isError: true,
        error,
      };
    }
  },
  getActionList: async (battleId: any) => {
    try {
      const res = await Http.get(`/pvp/${battleId}`);
      return res.data;
    } catch (error) {
      return {
        isError: true,
        error,
      };
    }
  },
};

export default apiBattle;
