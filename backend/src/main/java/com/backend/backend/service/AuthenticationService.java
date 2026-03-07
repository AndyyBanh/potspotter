package com.backend.backend.service;

import com.backend.backend.Exceptions.UserAlreadyExistsException;
import com.backend.backend.dto.LoginUserDto;
import com.backend.backend.dto.RegisterUserDto;
import com.backend.backend.model.User;
import com.backend.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public User signup(RegisterUserDto input) {

        if(this.userRepository.findByEmail(input.getEmail()).isPresent()) {

            throw new UserAlreadyExistsException("User already exists");
        }

        User user = new User(input.getUsername(), this.passwordEncoder.encode(input.getPassword()), input.getEmail());
        return this.userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {

        User user = this.userRepository.findByEmail(input.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
        return user;
    }
}
