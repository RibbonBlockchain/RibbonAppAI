export type TPhoneAuthBody = { phone: string };
export type TVerifyAuthPinBody = { phone: string; pin: string };
export type TVerifyPhoneAuthBody = { phone: string; code: string };
export type TPhoneOnboardBody = { phone: string; pin: string; code: string };

export type TPhoneAuthResponse = { exists?: boolean };
export type TVerifyAuthPinResponse = { accessToken: string };
