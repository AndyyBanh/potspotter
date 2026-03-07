package com.backend.backend.controller;

import com.backend.backend.dto.LoginUserDto;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.model.User;
import com.backend.backend.response.LoginResponse;
import com.backend.backend.service.AuthenticationService;
import com.backend.backend.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/auth")
@Controller
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {

        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {

        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {

        User authenticatedUser = this.authenticationService.authenticate(loginUserDto);
        String jwtToken = this.jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, this.jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }


}
