import { excludeFields } from "../utils/helper";
import User, { IUser, IVerificationCode } from "../models/user";
import { IProfile } from "schemas/profileCommand";

export const createUser = async (user: IUser) => {
  return await User.create(user);
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }, excludeFields()).lean();
};

export const updateEmailVerificationCode = async (
  email: string,
  verificationCode: IVerificationCode
) => {
  return await User.findOneAndUpdate(
    { email },
    {
      $set: {
        verificationCode,
      },
    },
    {
      returnOriginal: false,
    }
  ).lean();
};

export const verifyEmail = async (email: string) => {
  return await User.findOneAndUpdate(
    { email },
    {
      $set: {
        isEmailVerified: true,
      },
    },
    {
      returnOriginal: false,
    }
  ).lean();
};

export const forgetPassword = async (email: string, password: string) => {
  return await User.findOneAndUpdate(
    { email },
    {
      $set: {
        password,
      },
    },
    {
      returnOriginal: false,
    }
  ).lean();
};

export const findUserById = async (userId: string) => {
  return await User.findById(
    userId,
    excludeFields({
      _id: 0,
      password: 0,
      isEmailVerified: 0,
      email: 0,
      verificationCode : 0
    })
  ).lean();
};

export const findUserWithPassword = async (userId: string) => {
  return await User.findById(
    userId,
    excludeFields({
      _id: 0,
      isEmailVerified: 0,
      email: 0,
      verificationCode : 0
    })
  ).lean();
};

export const editProfile = async (profile: IProfile) => {
  return await User.findByIdAndUpdate(
    { _id: profile.userId },
    {
      $set: {
        ...profile,
      },
    },
    {
      returnOriginal: false,
    }
  ).select(
    "-createdAt -deletedAt -updatedAt -__v -password -email -isEmailVerified -verificationCode"
  );
};

export const editPassword = async (userId : string,hashedPassword: string) => {
  return await User.findByIdAndUpdate(
    { _id: userId },
    {
      $set: {
        password : hashedPassword,
      },
    },
    {
      returnOriginal: false,
    }
  ).select(
    "-createdAt -deletedAt -updatedAt -__v -password -email -isEmailVerified -verificationCode"
  );
};
