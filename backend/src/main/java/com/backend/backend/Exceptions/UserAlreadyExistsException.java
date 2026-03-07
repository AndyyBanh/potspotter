package com.backend.backend.Exceptions;

public class UserAlreadyExistsException extends RuntimeException{

    public UserAlreadyExistsException(String message) {

        super(message);
    }
}
