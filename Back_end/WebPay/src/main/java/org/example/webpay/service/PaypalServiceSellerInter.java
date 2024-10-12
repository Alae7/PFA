package org.example.webpay.service;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

public interface PaypalServiceSellerInter {

    public String getAccessToken();
    public void sendPayout(String recipientEmail, String amount, String currency, String note);

    }
