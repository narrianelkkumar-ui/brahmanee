export const LISP_FILE_NAME = "SEED_CAD_SUPER_MASTER_TIPPON.lsp";

export const LISP_FILE_CONTENT = `;; ==========================================================================
;;  SUPER MASTER LISP - ALL IN ONE INTEGRATED FILE
;;  Contains 16 Survey & Drafting Automation Commands (Added FT for Only Ft-In)
;;  Created with ❤️ for Professional Land Surveying
;;  Branding, Expiry & DEVICE LOCK Managed for: NARRI ANEL KKUMAR (Ph: 7711889955)
;; ==========================================================================

(vl-load-com)

;; ==========================================================================
;;  SECURITY BLOCK: TIME EXPIRY & OFFLINE DEVICE LOCK SYSTEM
;; ==========================================================================
(defun RE-CHECK-EXPIRY (/ expYear expMonth expDay sysDate curYear curMonth curDay fso drive currentSerial allowedSerial)
  (setq allowedSerial 1216933645 ) ;; <-- క్లయింట్ డివైజ్ లాక్ నంబర్
  
  (setq fso (vlax-create-object "Scripting.FileSystemObject"))
  (setq drive (vlax-invoke-method fso 'GetDrive "C:"))
  (setq currentSerial (vlax-get-property drive 'SerialNumber))
  (vlax-release-object fso)

  (if (/= currentSerial allowedSerial)
    (progn
      (alert (strcat "This software is NOT authorized for this computer!\\n"
                     "Registered on another device.\\n\\n"
                     "Please contact NARRI ANEL KKUMAR.\\n📞 Phone: +91 7711889955"))
      (exit)
    )
  )

  (setq expYear  2028
        expMonth 12
        expDay   31)

  (setq sysDate (rtos (getvar "CDATE") 2 0)
        curYear  (atoi (substr sysDate 1 4))
        curMonth (atoi (substr sysDate 5 2))
        curDay   (atoi (substr sysDate 7 2)))

  (if (or (> curYear expYear)
          (and (= curYear expYear) (> curMonth expMonth))
          (and (= curYear expYear) (= curMonth expMonth) (> curDay expDay)))
    (progn
      (alert "This software license has expired.\\nPlease contact NARRI ANEL KKUMAR for a renewal.\\n\\n📞 Phone: +91 7711889955")
      (exit)
    )
  )
)

;; ==========================================================================
;;  COMMON MATH, CONVERSION & SEARCH UTILITIES
;; ==========================================================================

(defun rtd (r) (* 180.0 (/ r pi)))

;; మీటర్ల నుండి రూపాయిలు-ఆణాలు మార్చే ఫార్ములా (లింక్స్ ఆధారంగా)
(defun meters-to-annas (dist_meters / total_annas rupees annas)
  (setq total_annas (/ (* dist_meters 5.0) 3.143245866))
  (setq rupees (fix (/ total_annas 16.0)))
  (setq annas (fix (+ 0.5 (- total_annas (* rupees 16.0)))))
  (if (= annas 16)
    (progn
      (setq rupees (1+ rupees))
      (setq annas 0))
  )
  (strcat (itoa rupees) "-" (itoa annas))
)

;; ఎంపిక చేసిన లైన్ దగ్గర్లో ఉన్న పాత టెక్స్ట్‌ను వెతికి ఆటోమేటిక్‌గా అప్‌డేట్ చేసే ఫంక్షన్
(defun update-associated-text (ent new_dist / obj p1 p2 mid ss i text_ent text_obj text_str new_annas_val radius found rlist)
  (setq obj (vlax-ename->vla-object ent))
  (setq p1 (vlax-curve-getStartPoint obj))
  (setq p2 (vlax-curve-getEndPoint obj))
  (setq mid (mapcar '(lambda (a b) (/ (+ a b) 2.0)) p1 p2))
  (setq found nil)
  (setq rlist (list 3.0 10.0 25.0 50.0))

  (foreach radius rlist
    (if (not found)
      (progn
        (setq ss (ssget "_C"
                        (list (- (car mid) radius) (- (cadr mid) radius))
                        (list (+ (car mid) radius) (+ (cadr mid) radius))
                        '((0 . "TEXT"))))
        (if ss
          (progn
            (setq i 0)
            (while (< i (sslength ss))
              (setq text_ent (ssname ss i))
              (setq text_obj (vlax-ename->vla-object text_ent))
              (setq text_str (vla-get-TextString text_obj))
              (if (vl-string-search "-" text_str)
                (progn
                  (setq new_annas_val (meters-to-annas new_dist))
                  (vla-put-TextString text_obj
                    (strcat new_annas_val " (" (rtos new_dist 2 2) "m)"))
                  (setq found T)
                )
              )
              (setq i (1+ i))
            )
          )
        )
      )
    )
  )

  (if found
    (princ "\\n[TFC] Label found & updated.")
    (princ "\\n[TFC] WARNING: No Rs-Annas/meters label found near this line (checked up to 50m radius).")
  )
)

;; ==========================================================================
;;  PART 1: TABLE AUTOMATION TOOLS (CTABLE & LGTABLE)
;; ==========================================================================

;; --- COMMAND 1: CTABLE (Click Point -> Single Table with S.No, X, Y) ---
(defun c:CTABLE (/ style pt sno x_val y_val coord_str old_osmode
                    tbl_pt row_h w1 w2 w3 txt_h col1 col2 col3
                    cur_pt header_pt)
  (RE-CHECK-EXPIRY)
  (setvar "cmdecho" 0)
  (setq old_osmode (getvar "osmode"))

  (princ "\\n========================================")
  (princ "\\n  Choose Coordinate Display Style:")
  (princ "\\n  1. Simple  -> 1234.56, 5678.90")
  (princ "\\n  2. Survey  -> N 5678.90 E 1234.56")
  (princ "\\n  3. Equals  -> X=1234.56 Y=5678.90")
  (princ "\\n========================================")
  (initget 1 "1 2 3")
  (setq style (getkword "\\n  Enter Choice [1/2/3]: "))

  (setq txt_h (getreal "\\nEnter Text Height <2.5>: "))
  (if (null txt_h) (setq txt_h 2.5))

  (setq row_h (* txt_h 2.2)) 
  (setq w1 (* txt_h 6.0))   
  (setq w2 (* txt_h 16.0))  
  (setq w3 (* txt_h 16.0))  

  (setq tbl_pt (getpoint "\\nPick Table Top-Left Position: "))
  (if (null tbl_pt) (exit))

  (coord20-draw-row tbl_pt w1 w2 w3 row_h)
  
  (coord20-draw-text (coord20-center tbl_pt w1 row_h) "S.No" txt_h)
  (coord20-draw-text (coord20-center (polar tbl_pt 0 w1) w2 row_h) "X" txt_h)
  (coord20-draw-text (coord20-center (polar tbl_pt 0 (+ w1 w2)) w3 row_h) "Y" txt_h)

  (setq sno 1)
  (setq cur_pt (polar tbl_pt (* 1.5 pi) row_h))

  (setvar "osmode" 16383)
  (princ "\\nClick Points... Press ENTER to Stop.")

  (while (setq pt (getpoint (strcat "\\nClick Point [S.No " (itoa sno) "]: ")))
    (setq x_val (rtos (car pt) 2 2))
    (setq y_val (rtos (cadr pt) 2 2))

    (cond
      ((= style "1")
       (setq col2 x_val)
       (setq col3 y_val))
      ((= style "2")
       (setq col2 (strcat "E " x_val))
       (setq col3 (strcat "N " y_val)))
      ((= style "3")
       (setq col2 (strcat "X=" x_val))
       (setq col3 (strcat "Y=" y_val)))
    )

    (coord20-draw-row cur_pt w1 w2 w3 row_h)

    (coord20-draw-text (coord20-center cur_pt w1 row_h) (itoa sno) txt_h)
    (coord20-draw-text (coord20-center (polar cur_pt 0 w1) w2 row_h) col2 txt_h)
    (coord20-draw-text (coord20-center (polar cur_pt 0 (+ w1 w2)) w3 row_h) col3 txt_h)

    (entmake (list (cons 0 "POINT") (cons 10 pt)))
    (princ (strcat "\\nAdded Row " (itoa sno) " -> X: " x_val " Y: " y_val))

    (setq cur_pt (polar cur_pt (* 1.5 pi) row_h))
    (setq sno (1+ sno))
  )

  (setvar "osmode" old_osmode)
  (princ "\\nDone. Total Points: ")
  (princ (1- sno))
  (princ)
)

(defun coord20-draw-row (pt w1 w2 w3 h) (coord20-draw-box pt w1 h) (coord20-draw-box (polar pt 0 w1) w2 h) (coord20-draw-box (polar pt 0 (+ w1 w2)) w3 h))
(defun coord20-draw-box (pt w h) (entmake (list (cons 0 "LWPOLYLINE") (cons 100 "AcDbEntity") (cons 100 "AcDbPolyline") (cons 90 4) (cons 70 1) (cons 10 (list (car pt) (cadr pt))) (cons 10 (list (+ (car pt) w) (cadr pt))) (cons 10 (list (+ (car pt) w) (- (cadr pt) h))) (cons 10 (list (car pt) (- (cadr pt) h))))))
(defun coord20-center (pt w h) (list (+ (car pt) (/ w 2.0)) (- (cadr pt) (/ h 2.0)) 0.0))
(defun coord20-draw-text (pt str h) (entmake (list (cons 0 "TEXT") (cons 10 pt) (cons 11 pt) (cons 40 h) (cons 1 str) (cons 72 1) (cons 73 2))))


;; --- COMMAND 2: LGTABLE (Survey Legend Table - Pre-draw Rows & Auto S.No) ---
(defun c:LGTABLE (/ tbl_pt row_h w1 w2 w3 w4 w5 txt_h cur_pt sno total_rows
                     syno_txt class_txt extent_txt color_choice color_idx
                     hatch_pt inner_pt inner_w inner_h rect_ent old_osmode i row_pts)
  (RE-CHECK-EXPIRY)
  (setvar "cmdecho" 0)
  (setq old_osmode (getvar "osmode"))

  (setq txt_h (getreal "\\nEnter Text Height <2.5>: "))
  (if (null txt_h) (setq txt_h 2.5))

  (setq row_h (* txt_h 2.5))
  (setq w1 (* txt_h 5.0))   
  (setq w2 (* txt_h 8.0))   
  (setq w3 (* txt_h 24.0))  
  (setq w4 (* txt_h 14.0))  
  (setq w5 (* txt_h 8.0))   

  (setq total_rows (getint "\\nEnter Total Rows (Number): "))
  (if (null total_rows) (setq total_rows 1))

  (setq tbl_pt (getpoint "\\nPick Table Top-Left Position: "))
  (if (null tbl_pt) (progn (princ "\\nCancelled.") (exit)))

  (legend20-draw-row tbl_pt w1 w2 w3 w4 w5 row_h)
  (legend20-draw-text (legend20-center tbl_pt w1 row_h) "S.No" txt_h)
  (legend20-draw-text (legend20-center (polar tbl_pt 0 w1) w2 row_h) "SY.NO" txt_h)
  (legend20-draw-text (legend20-center (polar tbl_pt 0 (+ w1 w2)) w3 row_h) "CLASSIFICATION" txt_h)
  (legend20-draw-text (legend20-center (polar tbl_pt 0 (+ w1 w2 w3)) w4 row_h) "EXTENT" txt_h)
  (legend20-draw-text (legend20-center (polar tbl_pt 0 (+ w1 w2 w3 w4)) w5 row_h) "LEGEND" txt_h)

  (setq cur_pt (polar tbl_pt (* 1.5 pi) row_h))
  (setq i 1)
  (setq row_pts nil)

  (while (<= i total_rows)
    (legend20-draw-row cur_pt w1 w2 w3 w4 w5 row_h)
    (legend20-draw-text (legend20-center cur_pt w1 row_h) (itoa i) txt_h)
    (setq row_pts (append row_pts (list cur_pt)))
    (setq cur_pt (polar cur_pt (* 1.5 pi) row_h))
    (setq i (1+ i))
  )
  (command "_.REDRAW")

  (setq sno 1)
  (foreach r_pt row_pts
    (princ (strcat "\\n\\n--- [Entering Data for Row " (itoa sno) "] ---"))
    
    (setq syno_txt (getstring t (strcat "\\n[Row " (itoa sno) "] SY.NO: ")))
    (legend20-draw-text (legend20-center (polar r_pt 0 w1) w2 row_h) syno_txt txt_h)

    (setq class_txt (getstring t (strcat "\\n[Row " (itoa sno) "] Classification: ")))
    (legend20-draw-text (legend20-center (polar r_pt 0 (+ w1 w2)) w3 row_h) class_txt txt_h)

    (setq extent_txt (getstring t (strcat "\\n[Row " (itoa sno) "] Extent (e.g. Ac 02-10): ")))
    (legend20-draw-text (legend20-center (polar r_pt 0 (+ w1 w2 w3)) w4 row_h) extent_txt txt_h)

    (princ "\\nChoose Legend Color:")
    (princ "\\n 1-Red  2-Yellow  3-Green  4-Cyan  5-Blue  6-Magenta  7-White")
    (initget 1 "1 2 3 4 5 6 7")
    (setq color_choice (getkword "\\nEnter Color [1-7]: "))
    (setq color_idx (atoi color_choice))

    (setq hatch_pt (polar r_pt 0 (+ w1 w2 w3 w4)))
    (setq inner_pt (list (+ (car hatch_pt) (* txt_h 0.5)) (- (cadr hatch_pt) (* txt_h 0.5)) 0.0))
    (setq inner_w (- w5 (* txt_h 1.0)))
    (setq inner_h (- row_h (* txt_h 1.0)))

    (command "_.RECTANG" "_non" inner_pt "_non" (list (+ (car inner_pt) inner_w) (- (cadr inner_pt) inner_h)))
    (setq rect_ent (entlast))
    (command "_.HATCH" "SOLID" "" rect_ent "")
    (command "_.CHPROP" (entlast) "" "Color" color_idx "")

    (setq sno (1+ sno))
  )

  (setvar "osmode" old_osmode)
  (princ "\\n\\nDone! All Rows Filled Successfully.")
  (princ)
)

(defun legend20-draw-row (pt w1 w2 w3 w4 w5 h) (legend20-draw-box pt w1 h) (legend20-draw-box (polar pt 0 w1) w2 h) (legend20-draw-box (polar pt 0 (+ w1 w2)) w3 h) (legend20-draw-box (polar pt 0 (+ w1 w2 w3)) w4 h) (legend20-draw-box (polar pt 0 (+ w1 w2 w3 w4)) w5 h))
(defun legend20-draw-box (pt w h) (entmake (list (cons 0 "LWPOLYLINE") (cons 100 "AcDbEntity") (cons 100 "AcDbPolyline") (cons 90 4) (cons 70 1) (cons 10 (list (car pt) (cadr pt))) (cons 10 (list (+ (car pt) w) (cadr pt))) (cons 10 (list (+ (car pt) w) (- (cadr pt) h))) (cons 10 (list (car pt) (- (cadr pt) h))))))
(defun legend20-center (pt w h) (list (+ (car pt) (/ w 2.0)) (- (cadr pt) (/ h 2.0)) 0.0))
(defun legend20-draw-text (pt str h) (entmake (list (cons 0 "TEXT") (cons 10 pt) (cons 11 pt) (cons 40 h) (cons 1 str) (cons 72 1) (cons 73 2))))


;; ==========================================================================
;;  PART 2: SURVEY METERS & AREA CALCULATION UTILITIES
;; ==========================================================================

;; --- COMMAND 3: ACGT (Area in Acres & Gunthas) ---
(defun c:ACGT (/ sel ent obj area conversion_factor total_acres acres_int decimal_part val_guntha acres_str gunthas_str text_str pt text_height)
  (RE-CHECK-EXPIRY)
  (setq conversion_factor 4046.845775)
  (if (setq sel (entsel "\\n[ACGT] Select Polyline for Acres/Gunthas: "))
    (progn
      (setq ent (car sel))
      (setq obj (vlax-ename->vla-object ent))
      (if (vlax-property-available-p obj 'Area)
        (progn
          (setq area (vla-get-area obj))
          (setq total_acres (/ area conversion_factor))
          (setq acres_int (fix total_acres))
          (setq decimal_part (- total_acres acres_int))
          (setq val_guntha (* decimal_part 40.0))
          
          (if (>= val_guntha 39.999) 
            (progn 
              (setq acres_int (1+ acres_int)) 
              (setq val_guntha 0.0)
            )
          )
          
          (if (< acres_int 10) 
            (setq acres_str (strcat "0" (itoa acres_int))) 
            (setq acres_str (itoa acres_int))
          )
          
          (if (< val_guntha 10.0)
            (setq gunthas_str (strcat "0" (rtos val_guntha 2 2)))
            (setq gunthas_str (rtos val_guntha 2 2))
          )
          
          (setq text_str (strcat "Ac. " acres_str " - " gunthas_str " Gts."))
          (setq pt (getpoint "\\nPick point to place text: "))
          (setq text_height (getvar "TEXTSIZE"))
          (if (= text_height 0.0) (setq text_height 2.5))
          (command "_.TEXT" "_non" pt text_height 0 text_str)
          (princ (strcat "\\nCreated Text: " text_str)))
        (princ "\\nError: Object has no area.")
      )
    )
    (princ "\\nNo object selected.")
  )
  (princ)
)

;; --- COMMAND 4: CHKAREA (Area Detail Alert & Command Line Print) ---
(defun c:CHKAREA (/ ent obj sq_mt total_guntas acres guntas acres_str gunthas_str msg)
  (RE-CHECK-EXPIRY)
  (vl-load-com)
  
  (setq ent (car (entsel "\\nSelect a Polyline to calculate Area: ")))
  (if ent
    (progn
      (setq obj (vlax-ename->vla-object ent))
      (if (vlax-property-available-p obj 'Area)
        (progn
          (setq sq_mt (vlax-get-property obj 'Area))
          (setq total_guntas (/ sq_mt 101.171144375))
          (setq acres (fix (/ total_guntas 40)))
          (setq guntas (- total_guntas (* acres 40)))
          
          (if (< acres 10) 
            (setq acres_str (strcat "0" (itoa acres))) 
            (setq acres_str (itoa acres))
          )
          
          (if (< guntas 10.0)
            (setq gunthas_str (strcat "0" (rtos guntas 2 2)))
            (setq gunthas_str (rtos guntas 2 2))
          )
          
          (setq msg (strcat "\\n--- AREA DETAILS ---"
                            "\\nAcres - Guntas: Ac. " acres_str " - " gunthas_str " Gts."
                            "\\nSquare Meters : " (rtos sq_mt 2 6) " Sq. Mt."
                    )
          )
          
          (alert msg)
          (princ msg)
        )
        (princ "\\nError: Selected object doesn't have an Area. Please select a Polyline.")
      )
    )
    (princ "\\nNo object selected.")
  )
  (princ)
)

;; --- COMMAND 5: SQAREA (Area in Sq.m & Sq.ft at Center) ---
(defun c:SQAREA (/ ent obj area_m area_f minPt maxPt centerPt text_content text_height)
  (RE-CHECK-EXPIRY)
  (setq ent (car (entsel "\\n[SQAREA] Select Polyline/Rectangle for Area: ")))
  (if ent
    (progn
      (setq obj (vlax-ename->vla-object ent))
      (if (vlax-property-available-p obj 'Area)
        (progn
          (setq area_m (vla-get-Area obj))
          (setq area_f (* area_m 10.7639))
          (vla-getboundingbox obj 'minPt 'maxPt)
          (setq minPt (vlax-safearray->list minPt))
          (setq maxPt (vlax-safearray->list maxPt))
          (setq centerPt (mapcar '(lambda (a b) (/ (+ a b) 2.0)) minPt maxPt))
          (setq text_content (strcat "AREA:\\n" (rtos area_m 2 2) " Sq.m\\n" (rtos area_f 2 2) " Sq.ft"))
          (setq text_height (* (sqrt area_m) 0.04))
          (if (< text_height 0.15) (setq text_height 0.15))
          (entmake (list (cons 0 "MTEXT") (cons 100 "AcDbEntity") (cons 100 "AcDbMText") (cons 10 centerPt) (cons 40 text_height) (cons 1 text_content) (cons 71 5)))
          (princ (strcat "\\nArea: " (rtos area_m 2 2) " Sq.m / " (rtos area_f 2 2) " Sq.ft")))
        (alert "Selected object does not have an Area.")
      )
    )
    (princ "\\nNo object selected.")
  )
  (princ)
)


;; ==========================================================================
;;  PART 3: DIMENSIONING & LABELLING TOOLS (DALL, LMF2, PDALL, MF, RAM, FT)
;; ==========================================================================

;; --- COMMAND 6: DALL (Single Dimension - Dual Units Meters & Feet) ---
(defun c:DALL ( / sel pt lastEnt newEnt dimData distVal feetVal txtStr)
  (RE-CHECK-EXPIRY)
  (setq sel (entsel "\\n[DALL] Select Line or Polyline segment: "))
  (if sel
    (progn
      (setq pt (cadr sel))
      (setq lastEnt (entlast))
      (command "_.DIMALIGNED" "" pt pause)
      (setq newEnt (entlast))
      (if (not (equal lastEnt newEnt))
        (progn
          (setq dimData (entget newEnt))
          (setq distVal (cdr (assoc 42 dimData)))
          (setq feetVal (* distVal 3.2808399))
          (setq txtStr (strcat (rtos distVal 2 2) " m\\\\P" (rtos feetVal 2 2) " ft"))
          (setq dimData (subst (cons 1 txtStr) (assoc 1 dimData) dimData))
          (entmod dimData)))
    )
    (princ "\\nNothing selected.")
  )
  (princ)
)

;; --- COMMAND 7: LMF2 (Meters & Feet Label Align to Line) ---
(defun c:LMF2 (/ ent obj p1 p2 mid pt_text len_m len_f text_content text_height angle_rad)
  (RE-CHECK-EXPIRY)
  (setq ent (car (entsel "\\n[LMF2] Select Line to Label: ")))
  (if ent
    (progn
      (setq obj (vlax-ename->vla-object ent))
      (setq p1 (vlax-curve-getStartPoint obj))
      (setq p2 (vlax-curve-getEndPoint obj))
      (setq mid (mapcar '(lambda (a b) (/ (+ a b) 2.0)) p1 p2))
      (setq len_m (vlax-curve-getDistAtParam obj (vlax-curve-getEndParam obj)))
      (setq len_f (/ len_m 0.3048))
      (setq text_content (strcat (rtos len_m 2 2) "m / " (rtos len_f 2 2) "ft"))
      (setq text_height (* len_m 0.03)) 
      (if (< text_height 0.1) (setq text_height 0.1))
      (setq angle_rad (angle p1 p2))
      (if (and (> angle_rad (/ pi 2)) (<= angle_rad (* 3 (/ pi 2))))
        (setq angle_rad (- angle_rad pi))
      )
      (setq pt_text (polar mid (- angle_rad (/ pi 2)) (* text_height 1.5)))
      (entmake (list (cons 0 "TEXT") (cons 10 pt_text) (cons 40 text_height) (cons 1 text_content) (cons 50 angle_rad) (cons 72 1) (cons 73 2) (cons 11 pt_text)))
      (princ (strcat "\\nLabel created: " text_content)))
    (princ "\\nNo line selected.")
  )
  (princ)
)

;; --- COMMAND 8: PDALL (Polyline Auto Dimension - Custom Text Size) ---
(defun c:PDALL (/ ent obj endParam i p1 p2 ptMid dimObj distVal feetVal txtStr newDimEnt dimData myTextHeight)
  (RE-CHECK-EXPIRY)
  (setq myTextHeight (getreal "\\n[PDALL] Enter Text Height (e.g. 0.15 or 0.25): "))
  (if (null myTextHeight) (setq myTextHeight 0.15))
  (setq ent (car (entsel "\\nSelect Line or Polyline: ")))
  (if ent
    (progn
      (setq obj (vlax-ename->vla-object ent))
      (if (vl-catch-all-error-p (vl-catch-all-apply 'vlax-curve-getEndParam (list obj)))
        (alert "Valid object not selected.")
        (progn
          (setq endParam (fix (vlax-curve-getEndParam obj)))
          (setq i 0)
          (repeat endParam
            (setq p1 (vlax-curve-getPointAtParam obj i))
            (setq p2 (vlax-curve-getPointAtParam obj (1+ i)))
            (if (and p1 p2)
              (progn
                (setq ptMid (list (/ (+ (car p1) (car p2)) 2.0) (/ (+ (cadr p1) (cadr p2)) 2.0) 0.0))
                (command "_.DIMALIGNED" "_non" p1 "_non" p2 "_non" ptMid)
                (setq newDimEnt (entlast))
                (setq dimData (entget newDimEnt))
                (setq distVal (cdr (assoc 42 dimData)))
                (setq feetVal (* distVal 3.2808399))
                (setq txtStr (strcat (rtos distVal 2 2) " m\\\\P" (rtos feetVal 2 2) " ft"))
                (setq dimData (subst (cons 1 txtStr) (assoc 1 dimData) dimData))
                (if (assoc 140 dimData)
                  (setq dimData (subst (cons 140 myTextHeight) (assoc 140 dimData) dimData))
                  (setq dimData (append dimData (list (cons 140 myTextHeight))))
                )
                (entmod dimData)
                (entupd newDimEnt)))
            (setq i (1+ i))
          )
          (princ "\\nDimensions updated.")))
    )
    (princ "\\nNo object selected.")
  )
  (princ)
)

;; --- COMMAND 9: MF (BELOW Line Label - Meters & Feet-Inches) ---
(defun c:MF (/ ent obj pt obj_type param idx p1 p2 dist m_val total_inches ft_part in_part f_val str mid ang current_h text_h ins_pt)
  (RE-CHECK-EXPIRY)
  (setvar "cmdecho" 0)
  (setq current_h (getvar "TEXTSIZE"))
  (setq text_h (getreal (strcat "\\nEnter Text Height <" (rtos current_h 2 2) ">: ")))
  (if (null text_h) (setq text_h current_h))
  (setvar "TEXTSIZE" text_h) 

  (while (setq ent (entsel "\\n[MF] Select Line or Polyline segment: "))
    (setq obj (vlax-ename->vla-object (car ent)))
    (setq pt (trans (cadr ent) 1 0))
    (setq obj_type (vla-get-ObjectName obj))
    (setq p1 nil)

    (if (= obj_type "AcDbLine")
      (progn
        (setq p1 (vlax-get obj 'StartPoint))
        (setq p2 (vlax-get obj 'EndPoint)))
    )
    (if (= obj_type "AcDbPolyline")
      (progn
        (setq pt (vlax-curve-getClosestPointTo obj pt))
        (setq param (vlax-curve-getParamAtPoint obj pt))
        (setq idx (fix param))
        (setq p1 (vlax-curve-getPointAtParam obj idx))
        (setq p2 (vlax-curve-getPointAtParam obj (1+ idx))))
    )
    (if p1
      (progn
        (setq dist (distance p1 p2))
        (setq m_val (rtos dist 2 2))
        
        (setq total_inches (* dist 39.3700787))
        (setq ft_part (fix (/ total_inches 12.0)))
        (setq in_part (fix (+ 0.5 (- total_inches (* ft_part 12.0)))))
        
        (if (= in_part 12)
          (progn
            (setq ft_part (1+ ft_part))
            (setq in_part 0))
        )
        
        (setq f_val (strcat (itoa ft_part) "'-" (itoa in_part) "\\\""))
        
        (setq str (strcat m_val "m / " f_val))
        (setq mid (mapcar '(lambda (a b) (/ (+ a b) 2.0)) p1 p2))
        (setq ang (angle p1 p2))
        (if (and (> ang (/ pi 2)) (<= ang (* 1.5 pi)))
            (setq ang (+ ang pi))
        )
        (setq ins_pt (polar mid (- ang (/ pi 2.0)) (* text_h 1.3)))
        (entmake (list (cons 0 "TEXT") (cons 10 ins_pt) (cons 11 ins_pt) (cons 40 text_h) (cons 1 str) (cons 50 ang) (cons 72 1) (cons 73 2))))
      (princ "\\nNot a Line or Polyline.")
    )
  )
  (princ)
)

;; --- COMMAND 10: RAM (BELOW Line Label - Rupees-Annas & Meters) ---
;; EX: 15-5 (30.40m)
(defun c:RAM (/ ent obj pt obj_type param idx p1 p2 dist annas_str text_str mid ang current_h text_h ins_pt)
  (RE-CHECK-EXPIRY)
  (setvar "cmdecho" 0)
  (setq current_h (getvar "TEXTSIZE"))
  (setq text_h (getreal (strcat "\\nEnter Text Height <" (rtos current_h 2 2) ">: ")))
  (if (null text_h) (setq text_h current_h))
  (setvar "TEXTSIZE" text_h) 

  (while (setq ent (entsel "\\n[RAM] Select Line or Polyline segment: "))
    (setq obj (vlax-ename->vla-object (car ent)))
    (setq pt (trans (cadr ent) 1 0))
    (setq obj_type (vla-get-ObjectName obj))
    (setq p1 nil)

    (if (= obj_type "AcDbLine")
      (progn
        (setq p1 (vlax-get obj 'StartPoint))
        (setq p2 (vlax-get obj 'EndPoint)))
    )
    (if (= obj_type "AcDbPolyline")
      (progn
        (setq pt (vlax-curve-getClosestPointTo obj pt))
        (setq param (vlax-curve-getParamAtPoint obj pt))
        (setq idx (fix param))
        (setq p1 (vlax-curve-getPointAtParam obj idx))
        (setq p2 (vlax-curve-getPointAtParam obj (1+ idx))))
    )
    (if p1
      (progn
        (setq dist (distance p1 p2))
        (setq annas_str (meters-to-annas dist))
        
        ;; Format: "15-5 (30.40m)"
        (setq text_str (strcat annas_str " (" (rtos dist 2 2) "m)"))
        
        (setq mid (mapcar '(lambda (a b) (/ (+ a b) 2.0)) p1 p2))
        (setq ang (angle p1 p2))
        (if (and (> ang (/ pi 2)) (<= ang (* 1.5 pi)))
            (setq ang (+ ang pi))
        )
        (setq ins_pt (polar mid (- ang (/ pi 2.0)) (* text_h 1.3)))
        (entmake (list (cons 0 "TEXT") (cons 10 ins_pt) (cons 11 ins_pt) (cons 40 text_h) (cons 1 text_str) (cons 50 ang) (cons 72 1) (cons 73 2))))
      (princ "\\nNot a Line or Polyline.")
    )
  )
  (princ)
)

;; --- COMMAND 11: FT (BELOW Line Label - ONLY Feet & Inches) ---
;; EX: 15'-5"
(defun c:FT (/ ent obj pt obj_type param idx p1 p2 dist total_inches ft_part in_part text_str mid ang current_h text_h ins_pt)
  (RE-CHECK-EXPIRY)
  (setvar "cmdecho" 0)
  (setq current_h (getvar "TEXTSIZE"))
  (setq text_h (getreal (strcat "\\nEnter Text Height <" (rtos current_h 2 2) ">: ")))
  (if (null text_h) (setq text_h current_h))
  (setvar "TEXTSIZE" text_h) 

  (while (setq ent (entsel "\\n[FT] Select Line or Polyline segment: "))
    (setq obj (vlax-ename->vla-object (car ent)))
    (setq pt (trans (cadr ent) 1 0))
    (setq obj_type (vla-get-ObjectName obj))
    (setq p1 nil)

    (if (= obj_type "AcDbLine")
      (progn
        (setq p1 (vlax-get obj 'StartPoint))
        (setq p2 (vlax-get obj 'EndPoint)))
    )
    (if (= obj_type "AcDbPolyline")
      (progn
        (setq pt (vlax-curve-getClosestPointTo obj pt))
        (setq param (vlax-curve-getParamAtPoint obj pt))
        (setq idx (fix param))
        (setq p1 (vlax-curve-getPointAtParam obj idx))
        (setq p2 (vlax-curve-getPointAtParam obj (1+ idx))))
    )
    (if p1
      (progn
        (setq dist (distance p1 p2))
        
        ;; Meters to Feet & Inches Calculator
        (setq total_inches (* dist 39.3700787))
        (setq ft_part (fix (/ total_inches 12.0)))
        (setq in_part (fix (+ 0.5 (- total_inches (* ft_part 12.0)))))
        
        (if (= in_part 12)
          (progn
            (setq ft_part (1+ ft_part))
            (setq in_part 0))
        )
        
        ;; Format: 15'-5"
        (setq text_str (strcat (itoa ft_part) "'-" (itoa in_part) "\\\""))
        
        (setq mid (mapcar '(lambda (a b) (/ (+ a b) 2.0)) p1 p2))
        (setq ang (angle p1 p2))
        (if (and (> ang (/ pi 2)) (<= ang (* 1.5 pi)))
            (setq ang (+ ang pi))
        )
        (setq ins_pt (polar mid (- ang (/ pi 2.0)) (* text_h 1.3)))
        (entmake (list (cons 0 "TEXT") (cons 10 ins_pt) (cons 11 ins_pt) (cons 40 text_h) (cons 1 text_str) (cons 50 ang) (cons 72 1) (cons 73 2))))
      (princ "\\nNot a Line or Polyline.")
    )
  )
  (princ)
)

;; --- COMMAND 12: TIPPON (Tippon Drawing - Number Pad Direction Drawing: 8-Up, 2-Down, 4-Left, 6-Right) ---
(defun c:TIPPON (/ *error* val input len pos rupees annas total_annas dist_links dist_meters pt1 pt2 loop char keycode old_osmode FACTOR DIVISOR)
  (RE-CHECK-EXPIRY)
  (setq old_osmode (getvar "osmode"))

  (defun *error* (msg)
    (if old_osmode (setvar "osmode" old_osmode)) 
    (setvar "cmdecho" 1)
    (princ "\\nCommand Cancelled. Snaps Restored.")
    (princ)
  )

  (setvar "cmdecho" 0)
  (setvar "osmode" 16383) 
  (setq pt1 (getpoint "\\n[TIPPON] Start Point Click Cheyandi: "))
  
  (if pt1
    (progn
      (setvar "osmode" 0) 
      (setq loop T)
      (princ "\\n------------------------------------------------")
      (princ "\\nCOMMAND: TIPPON (Numpad Controls)")
      (princ "\\n 8 = UP (Piki)")
      (princ "\\n 2 = DOWN (Kindaki)")
      (princ "\\n 4 = LEFT (Edamaki)")
      (princ "\\n 6 = RIGHT (Kudiki)")
      (princ "\\n------------------------------------------------")
      
      (setq FACTOR 3.143245866) 
      (setq DIVISOR 5.0)        

      (while loop
        (setq input (getstring "\\nEnter value (e.g. 1-1) or ENTER to finish: "))
        
        (if (= input "")
          (setq loop nil) 
          (progn
            (setq pos (vl-string-search "-" input))
            (if pos
              (progn
                (setq rupees (atof (substr input 1 pos)))
                (setq annas (atof (substr input (+ pos 2))))
                (setq total_annas (+ (* rupees 16) annas))
                (setq dist_links (* total_annas FACTOR))
                (setq dist_meters (/ dist_links DIVISOR))
              )
              (if (distof input)
                (setq dist_meters (atof input))
                (setq dist_meters 0.0) 
              )
            )
            
            (if (> dist_meters 0)
                (progn
                    (princ (strcat "\\nLength: " (rtos dist_meters 2 3) "m. Press 8/2/4/6 on Numpad: "))
                    (setq keycode (grread))
                    (setq char (cadr keycode))
                    (setq pt2 nil)
                    
                    (cond
                      ((= char 56) 
                       (setq pt2 (polar pt1 (/ pi 2) dist_meters))
                       (wa_draw_line_text pt1 pt2 input dist_meters)
                       (setq pt1 pt2) 
                       (princ " -> UP")
                       )
                      ((= char 50) 
                       (setq pt2 (polar pt1 (* 1.5 pi) dist_meters))
                       (wa_draw_line_text pt1 pt2 input dist_meters)
                       (setq pt1 pt2) 
                       (princ " -> DOWN")
                       )
                      ((= char 52) 
                       (setq pt2 (polar pt1 pi dist_meters))
                       (wa_draw_line_text pt1 pt2 input dist_meters)
                       (setq pt1 pt2) 
                       (princ " -> LEFT")
                       )
                      ((= char 54) 
                       (setq pt2 (polar pt1 0.0 dist_meters))
                       (wa_draw_line_text pt1 pt2 input dist_meters)
                       (setq pt1 pt2) 
                       (princ " -> RIGHT")
                       )
                      (T (princ "\\nInvalid Key. Use 8, 2, 4, 6."))
                    )
                )
                (princ "\\nInvalid Distance.")
            ) 
          ) 
        ) 
      ) 
    ) 
  ) 
  
  (setvar "osmode" old_osmode) 
  (princ "\\nDone.")
  (princ)
)

(defun wa_draw_line_text (p1 p2 txt meters / midp txt_hgt full_text ang_rad ang_deg txt_pt offset_dist perp_ang)
  (command "_.LINE" "_non" p1 "_non" p2 "")
  (setq midp (list (/ (+ (car p1) (car p2)) 2.0) (/ (+ (cadr p1) (cadr p2)) 2.0) 0.0))
  (setq ang_rad (angle p1 p2))
  (setq ang_deg (* 180.0 (/ ang_rad pi)))
  
  (if (and (> ang_deg 90) (<= ang_deg 270))
      (setq ang_deg (+ ang_deg 180))
  )

  (setq txt_hgt (+ 0.04 (* meters 0.02))) 
  (if (> txt_hgt 3.0) (setq txt_hgt 3.0)) 

  (setq offset_dist (* txt_hgt 0.7)) 
  (setq perp_ang (+ ang_rad (/ pi 2)))
  (setq txt_pt (polar midp perp_ang offset_dist))

  (setq full_text (strcat txt " (" (rtos meters 2 2) "m)"))
  (command "_.TEXT" "_j" "_mc" "_non" txt_pt txt_hgt ang_deg full_text)
)


;; --- COMMAND 13: TFC (Tippon Fix & Connect with Auto Label Update up to 50m) ---
(defun c:TFC (/ *error* ent obj p1 p2 pick_pt target_pt which_end
                old_len new_len old_osmode diff_val)

  (defun *error* (msg)
    (if old_osmode (setvar "osmode" old_osmode))
    (setvar "cmdecho" 1)
    (if (and msg
             (/= (strcase msg) "FUNCTION CANCELLED")
             (/= (strcase msg) "QUIT / EXIT ABORT"))
      (princ (strcat "\\n[TFC] Error: " msg))
    )
    (princ)
  )

  (RE-CHECK-EXPIRY)
  (setvar "cmdecho" 0)
  (setq old_osmode (getvar "osmode"))

  (princ "\\n========================================")
  (princ "\\n  TFC - Tippon Fix, Connect (v3)")
  (princ "\\n  Line ni fix cheyali - end daggara click cheyandi")
  (princ "\\n========================================")

  (setq ent (entsel "\\n[TFC] Select Line (click near the loose end): "))

  (cond
    ((not ent)
     (princ "\\n[TFC] STOPPED: No line selected.")
    )

    ((/= (vla-get-ObjectName (vlax-ename->vla-object (car ent))) "AcDbLine")
     (princ "\\n[TFC] STOPPED: Only simple LINE entities supported.")
    )

    (T
     (setq obj (vlax-ename->vla-object (car ent)))
     (setq pick_pt (trans (cadr ent) 1 0))
     (setq p1 (vlax-get obj 'StartPoint))
     (setq p2 (vlax-get obj 'EndPoint))
     (setq old_len (distance p1 p2))

     (if (< (distance pick_pt p1) (distance pick_pt p2))
       (setq which_end "start")
       (setq which_end "end")
     )

     (setvar "osmode" 1)
     (setq target_pt (getpoint "\\n[TFC] Snap to TARGET point (other line's endpoint): "))
     (setvar "osmode" old_osmode)

     (if (not target_pt)
       (princ "\\n[TFC] STOPPED: No target point picked.")

       (progn
         (if (= which_end "start")
           (setq new_len (distance target_pt p2))
           (setq new_len (distance p1 target_pt))
         )
         (setq diff_val (- new_len old_len))

         (update-associated-text (car ent) new_len)

         (if (= which_end "start")
           (vla-put-StartPoint obj (vlax-3d-point target_pt))
           (vla-put-EndPoint obj (vlax-3d-point target_pt))
         )

         (princ (strcat "\\n[TFC] Old Length : " (rtos old_len 2 3) " m"))
         (princ (strcat "\\n[TFC] New Length : " (rtos new_len 2 3) " m"))
         (princ (strcat "\\n[TFC] "
                        (if (> diff_val 0.0)
                          (strcat "GAP FILLED (+" (rtos diff_val 2 3) " m)")
                          (strcat "OVERLAP CUT (" (rtos diff_val 2 3) " m)")
                        )))
       )
     )
    )
  )

  (setvar "osmode" old_osmode)
  (princ)
)

(princ "\\n=======================================================")
(princ "\\n       ⚡ BRAHMANEE SUPER MASTER LISP LOADED ⚡")
(princ "\\n=======================================================")
(princ "\\n  Auth: NARRI ANEL KKUMAR | Contact: +91 7711889955")
(princ "\\n=======================================================")
(princ)
`;
