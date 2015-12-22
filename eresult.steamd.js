// NodeJS "STEAM-NODE" Helper
// This file is apart of the IDLE-HELPER collection made by Lynxaa. <M.I.T>
// This file consists of data from https://github.com/SteamRE/SteamKit/blob/master/Resources/SteamLanguage/eresult.steamd
// converted to a working javascript array (key / value).
//
// http://steamcommunity.com/id/Lynxaa
// http://github.com/Lynxaa

var EResult = {};
EResult['Invalid'] = 0;
EResult['OK'] = 1;
EResult['Fail'] = 2;
EResult['NoConnection'] = 3;
EResult['InvalidPassword'] = 5;
EResult['LoggedInElsewhere'] = 6;
EResult['InvalidParam'] = 8;
EResult['Busy'] = 10;
EResult['InvalidName'] = 12;
EResult['DuplicateName'] = 14;
EResult['AccessDenied'] = 15;
EResult['Timeout'] = 16;
EResult['Banned'] = 17;
EResult['InvalidSteamID'] = 19;
EResult['ServiceUnavailable'] = 20;
EResult['NotLoggedOn'] = 21;
EResult['Pending'] = 22;
EResult['EncryptionFailure'] = 23;
EResult['InsufficientPrivilege'] = 24;
EResult['LimitExceeded'] = 25;
EResult['Revoked'] = 26;
EResult['Expired'] = 27;
EResult['AlreadyRedeemed'] = 28;
EResult['DuplicateRequest'] = 29;
EResult['AlreadyOwned'] = 30;
EResult['IPNotFound'] = 31;
EResult['PersistFailed'] = 32;
EResult['LockingFailed'] = 33;
EResult['LogonSessionReplaced'] = 34;
EResult['ConnectFailed'] = 35;
EResult['HandshakeFailed'] = 36;
EResult['IOFailure'] = 37;
EResult['RemoteDisconnect'] = 38;
EResult['ShoppingCartNotFound'] = 39;
EResult['Blocked'] = 40;
EResult['Ignored'] = 41;
EResult['NoMatch'] = 42;
EResult['AccountDisabled'] = 43;
EResult['ServiceReadOnly'] = 44;
EResult['AccountNotFeatured'] = 45;
EResult['AdministratorOK'] = 46;
EResult['ContentVersion'] = 47;
EResult['TryAnotherCM'] = 48;
EResult['PasswordRequiredToKickSession'] = 49;
EResult['AlreadyLoggedInElsewhere'] = 50;
EResult['Suspended'] = 51;
EResult['Cancelled'] = 52;
EResult['DataCorruption'] = 53;
EResult['DiskFull'] = 54;
EResult['RemoteCallFailed'] = 55;
EResult['PasswordUnset'] = 56;
EResult['ExternalAccountUnlinked'] = 57;
EResult['PSNTicketInvalid'] = 58;
EResult['ExternalAccountAlreadyLinked'] = 59;
EResult['RemoteFileConflict'] = 60;
EResult['IllegalPassword'] = 61;
EResult['SameAsPreviousValue'] = 62;
EResult['AccountLogonDenied'] = 63;
EResult['CannotUseOldPassword'] = 64;
EResult['InvalidLoginAuthCode'] = 65;
EResult['AccountLogonDeniedNoMail'] = 66;
EResult['HardwareNotCapableOfIPT'] = 67;
EResult['IPTInitError'] = 68;
EResult['ParentalControlRestricted'] = 69;
EResult['FacebookQueryError'] = 70;
EResult['ExpiredLoginAuthCode'] = 71;
EResult['IPLoginRestrictionFailed'] = 72;
EResult['AccountLockedDown'] = 73;
EResult['AccountLogonDeniedVerifiedEmailRequired'] = 74;
EResult['NoMatchingURL'] = 75;
EResult['BadResponse'] = 76;
EResult['RequirePasswordReEntry'] = 77;
EResult['ValueOutOfRange'] = 78;
EResult['UnexpectedError'] = 79;
EResult['Disabled'] = 80;
EResult['InvalidCEGSubmission'] = 81;
EResult['RestrictedDevice'] = 82;
EResult['RegionLocked'] = 83;
EResult['RateLimitExceeded'] = 84;
EResult['AccountLoginDeniedNeedTwoFactor'] = 85;
EResult['ItemDeleted'] = 86;
EResult['AccountLoginDeniedThrottle'] = 87;
EResult['TwoFactorCodeMismatch'] = 88;
EResult['TwoFactorActivationCodeMismatch'] = 89;
EResult['AccountAssociatedToMultiplePartners'] = 90;
EResult['NotModified'] = 91;
EResult['NoMobileDevice'] = 92;
EResult['TimeNotSynced'] = 93;
EResult['SMSCodeFailed'] = 94;
EResult['AccountLimitExceeded'] = 95;
EResult['AccountActivityLimitExceeded'] = 96;
EResult['PhoneActivityLimitExceeded'] = 97;
EResult['RefundToWallet'] = 98;
EResult['EmailSendFailure'] = 99;
EResult['NotSettled'] = 100;

/* Returns the key index of EResult
 * if a match in index is found in the
 * EResult array. https://github.com/SteamRE/SteamKit/blob/master/Resources/SteamLanguage/eresult.steamd
 */
var getResult = function(index) {
    for (var key in EResult) {
        if (EResult[key] == index) {
            return key;
        }
    }
}

// Export for public accessibility
module.exports = {
    EResult: EResult,
    getResult: getResult
};
