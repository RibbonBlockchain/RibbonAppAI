export type TGetAuth = { enabled?: boolean };
export type TCheckPhoneBody = { phone: string };
export type TPhoneSignUpRequestBody = { phone: string };
export type TPhoneLoginBody = { phone: string; pin: string };
export type TVerifyPhoneSignUpBody = { phone: string; code: string };
export type TPhoneSignPinUpBody = { phone: string; code: string; pin: string };

export type TCheckPhoneResponse = { exists: boolean };
export type TPhoneLoginResponse = { accessToken: string };
export type TPhoneSignUpRequestResponse = { exists: boolean };
