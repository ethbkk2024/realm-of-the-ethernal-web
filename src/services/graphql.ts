import axios from 'axios';

const apiGraphql = {
  getNFTsByOwner: async (address: string) => {
    const query = `
query getTransferSingles($ownerId: ID!) {
  transferSingles(where: {to:$ownerId }, first: 1000) {
    from
    to
    value
    NFT_id
  }
}
`;
    try {
      const res: any = await axios.post(
        `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
        {
          query: query,
          variables: {
            ownerId: address,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
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

export default apiGraphql;
