import Http from '@/api/http';

const apiAuth = {
  login: async (wallet_address: string) => {
    try {
      const res = await Http.post(`/auth/login`, {
        wallet_address: wallet_address,
      });
      return res.data;
    } catch (error) {
      return {
        isError: true,
        error,
      };
    }
  },
};

export default apiAuth;
