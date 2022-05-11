namespace Express {
  export interface Request {
    kauth: {
      grant: {
        access_token: {
          token: string;
          clientId: string;
          header: {
            alg: string;
            typ: string;
            kid: string;
          };
          content: {
            exp: number;
            iat: number;
            auth_time: number;
            jti: string;
            iss: string;
            aud: string;
            sub: string;
            typ: string;
            azp: string;
            nonce: string;
            session_state: string;
            acr: string;
            'allowed-origins': string[];
            sid: string;
            email_verified: boolean;
            name: string;
            preferred_username: string;
            given_name: string;
            family_name: string;
          };
        };
      };
    };
  }
}
