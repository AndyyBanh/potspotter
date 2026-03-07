package com.backend.backend.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

    private String token;
    private long expiration;

    public LoginResponse(String token, long expiration) {

        this.token = token;
        this.expiration = expiration;
    }


}
