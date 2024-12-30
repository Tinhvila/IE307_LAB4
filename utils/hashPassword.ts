import * as Crypto from "expo-crypto";

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    return password;
  }
}

export async function comparePassword(
  plainPassword: string,
  storedHashedPassword: string
) {
  try {
    const hashedInputPassword = await hashPassword(plainPassword);

    if (hashedInputPassword === storedHashedPassword) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error comparing password:", error);
    return false;
  }
}
