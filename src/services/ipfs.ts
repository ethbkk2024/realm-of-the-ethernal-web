import axios from 'axios';

const apiIPFS = {
  getMetadata: async (tokenId: number | string) => {
    try {
      const res: any = await axios.get(
        `${process.env.NEXT_PUBLIC_IPFS_ENDPOINT}/${tokenId}.json`,
      );
      return res.data;
    } catch (error) {
      return {
        isError: true,
        error,
      };
    }
  },
};

export default apiIPFS;
