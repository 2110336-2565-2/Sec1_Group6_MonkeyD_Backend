import Omise from "omise";

const omisePublicKey = process.env.OMISE_PUBLIC_KEY;
const omiseSecretKey = process.env.OMISE_SECRET_KEY;

const omise = new Omise({
  publicKey: omisePublicKey,
  secretKey: omiseSecretKey,
});

export const createAccount = async (user, cardToken) => {
  if (user.omiseCustomerId) {
    return user;
  }
  const customer = await omise.customers.create({
    email: user.email,
    description: user._id,
    card: cardToken,
  });
  user.omiseCustomerId = customer.id;
  await user.save();
  return user;
};

export const getOmiseBalance = async (omiseCustomerId) => {
  console.log("omiseCustomerId:", omiseCustomerId);

  const customer = await omise.customers.retrieve(omiseCustomerId);
  const charges = await omise.charges.list({customer: omiseCustomerId});

  let totalCharges = 0;
  let totalRefunds = 0;

  for (const charge of charges.data) {
    if (charge.customer === omiseCustomerId) {
      totalCharges += charge.amount;
      // Retrieve the charge object with its refunds
      const chargeWithRefunds = await omise.charges.retrieve(charge.id);
      chargeWithRefunds.refunds.data.forEach((refund) => {
        totalRefunds += refund.amount;
      });
    }
  }
  console.log("Charges:", charges.data);
  const balance = totalCharges - totalRefunds;
  return balance;
};

export const addFunds = async (omiseCustomerId, amount, id) => {
  try {
    const charge = await omise.charges.create({
      customer: omiseCustomerId,
      amount: amount * 100, // Convert to the smallest currency unit (satang for THB)
      currency: "thb",
      description: `Top-up Wallet for user ${id}`,
    });

    return charge;
  } catch (error) {
    console.error("Error creating charge:", error);
    throw error;
  }
};
