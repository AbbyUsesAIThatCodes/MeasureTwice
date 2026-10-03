# Workshop Proportions And Clearances

Historical review snapshot. The October 3 reconciled behavior and current artifact are described in [Current Review](CURRENT_REVIEW.md). Preserve these earlier observations and identities; their merge order and superseded geometry/evidence requirements are not current instructions.


Issue #21 follows PR #20. The cup was a solid capped cylinder with leaning box pencils. It now uses a hollow lathed shell, a visible inner wall and floor, and four spaced hexagonal pencils seated just above the inner floor. Pencil paths clear both the shell and one another.

The original receiving tray occupied the stock/offcut range. Its new 6.6-unit deck is centered at X=8.3, Z=1.35, beyond the maximum offcut endpoint. Accepted pieces use that same new destination, with the original on the tray floor and copies separated by their unchanged profile height. The bench extends under this receiving station. The independent comparison rack moves behind the station, clear of both the house and tray; its pieces still align at their starts.

The working surface rises 1.35 world units, from 2.58 to 3.93. A shared parent transform raises every workpiece, bench prop and camera together. Leg lengths extend to the original floor; measured pieces are only translated, never scaled. Inspection projection uses world transforms and retains the same inch scale. Room geometry stays on the floor and keeps PR20 camera clearance.

The extended `scripts/visual-check.cjs` checks grounded legs, hollow cup profile, pencil clearance, smallest/largest stock and offcut envelopes, staging within the receiving tray, all existing cut/reset/mode/house paths and 720 camera positions. Exact test results and per-PR source/build identities belong to the review artifact.

Shared-asset changes are the cup/pencils, taller extended bench and relocated receiving/comparison surfaces. Preserve approved archive attribution and the new `view-limits.js` dependency. No central graphics catalog is changed by this work. This affects decoration and camera access, not the existing DM 1.3 goal mapping, student-response evidence or assessment support rules.
