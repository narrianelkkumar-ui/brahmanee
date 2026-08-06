;;; ===================================================================
;;; SEED-CAD - Telangana Land Surveyor Tippon LISP
;;; Creator: Narri Anel Kkumar
;;; ===================================================================

(vl-load-com)

;;; SECURITY BLOCK: TIME & OFFLINE DEVICE LOCK SYSTEM
(defun *check-expiry* (/ current-year curyear curmonth curday f_drive currentserial allowedserial)
  (setq allowedserial "3219835645")
  (setq f_drive (getenv "SystemDrive"))
  (setq currentserial (vlax-invoke-method (vla-get-object (vla-get-activedocument (vlax-get-acad-object)) "GetDrive") "GetSerialNumber" f_drive))
  
  (if (/= currentserial allowedserial)
    (progn
      (alert "\nThis software is not authorized for this computer!\n\nPlease contact NARRI ANEL KKUMAR, Ph: +91 771889955")
      (exit)
    )
  )
)
(*check-expiry*)

;;; (మీ మిగతా ఆటోలిస్ప్ కోడ్ అంతా ఇక్కడ పేస్ట్ చేయండి...)
