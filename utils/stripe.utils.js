import Omise from "omise";

const omisePublicKey = process.env.OMISE_PUBLIC_KEY;
const omiseSecretKey = process.env.OMISE_SECRET_KEY;

const omise = new Omise({
  publicKey: omisePublicKey,
  secretKey: omiseSecretKey,
});
export const chargeAccount = async (
  id,
  email,
  amount,
  cardToken,
  description
) => {
  const customer = await omise.customers.create({
    email,
    description: id,
    card: cardToken,
  });

  const charge = await omise.charges.create({
    // Replace omiseClient with omise
    amount,
    currency: "THB",
    customer: customer.id,
    description,
  });
  return {
    amount: charge.amount,
    status: charge.status,
  };
};
