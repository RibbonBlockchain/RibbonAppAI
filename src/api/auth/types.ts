export type TGetAuth = { enabled?: boolean };
export type TGetResponse = { enabled?: boolean };

export type TWorldIDLoginBody = { id: string };
export type TCheckPhoneBody = { phone: string };
export type TPhoneSignUpRequestBody = { phone: string };
export type TPhoneLoginBody = { phone: string; pin: string };
export type TVerifyPhoneSignUpBody = { phone: string; code: string };
export type TVerifyPhoneUpdateBody = { phone: string; code: string };
export type TChangePinBody = { currentPin: string; newPin: string };
export type TCreateNewPinBody = { phone: string; code: string; pin: string };

export type TPhoneSignPinUpBody = { phone: string; code: string; pin: string };

export type TCheckPhoneResponse = { exists: boolean };
export type TWorldIDLoginResponse = { accessToken: string };
export type TPhoneSignUpRequestResponse = { exists: boolean };
export type TPhoneLoginResponse = { id: string; accessToken: string };
