# Fixed Workshop Layout

The owner approved this layout after reviewing PR #36's scale drawing. This branch starts from merged PR #36 (`0b2f288678c2a419e66c475cf8228fd87a453a76`) and preserves its camera recovery, contrast, room surfaces, pointer, click focus and save behavior. The previous drawing remains historical. No merge, deployment or delivery to the colleague is authorized.

## Implemented Arrangement

One 102 × 36 inch cutting table, 34 inches high, replaces the proposed bench plus separate support. Six grounded legs support it. The extra two inches accommodate the requested four-inch leftward saw shift while retaining full metre-stock travel on the table. The saw is front-left. A shallow green tray sits centrally to its right, with the rectangular comparison area behind it and assembly at the front-right. Furniture stays identical for every instrument.

| Item | Physical Dimensions Or Position |
| --- | --- |
| Room | 144 × 120 inches; walls 96 inches high |
| Bench | 102 × 36 inches; surface 34 inches above the floor |
| Saw Base | 24 × 24 inches; blade line 11 inches left of bench center |
| Full Metre Stock Sweep | X −50.370 to +28.370 inches within the bench's −51 to +51 inch limits |
| Green Tray | 40 × 8 inches; center 27 inches right, 1 inch behind bench center |
| Comparison Area | 40 × 8 inches behind the tray |
| Assembly Area | 12 × 10 inches at the front-right |
| Right Stock Bed | Ends 30 inches right of center, beyond full metre travel and before assembly |

The tray is temporary staging: accepted pieces arrive, their required equal copies appear, then parts travel to the model or comparison area. It is labeled **Ready To Assemble**. Wrong pieces leave to the left. Free Play's existing Duplicate Last Piece action still rebuilds comparison pieces directly. Reduced motion reaches the same final placement.

## Scale And Framing

One inch remains exactly two world units and 2,032 physical ticks. One sixteenth is 127 ticks; one millimetre is 80 ticks. Planks remain 0.11 inches thick and 0.315 inches wide. Model lengths, cross sections and part counts are unchanged. These are physically small tabletop miniatures: the house is about three inches wide. Instruments change the stock and camera framing, never furniture or model scale.

The initial view and instrument switches frame the actual cutting stock. Home View shows the fixed workshop. Existing saw/tray/model focus controls and click targets provide close views, and free orbit remains available. Presets account for the rendered ruler dock; overview and transfer framing also reserve camera-control clearance. Transparent gaps between controls no longer intercept the blue cutting handle. The ruler magnifier, visible graduation grid, keyboard steps and endpoint controls remain the precision inputs; the wide room view does not imply subpixel 3D dragging accuracy.

The integrated stock bed stops before the assembly area. Cuts move forward below the raised saw before lifting to the inspection position; accepted transfers travel above the saw before descending into staging. Straight-on inspection remains held until acknowledgement. The selection camera is outside the large blade's plane; the saw and blade have the same fixed physical proportions for all instruments.

## Review Evidence And Scope

[Layout Evidence](../review-evidence/fixed-layout/README.md) records the actual artifact ID, source, ZIP, screenshots and completed checks. Test scripts cover exact measurement and grid arithmetic, all seven instruments, all four models, ten Learn stages, held/retried cuts, save/replay retention, camera recovery, pointer/click ownership and full-motion assemblies. Browser checks use synthetic data in isolated Chromium profiles on Abigail; they do not modify owner browser saves. Physical Chromebook/trackpad and classroom acceptance remain untested.

Instructional target: unchanged Activity 1.3 ruler reading, visible graduations, prediction followed by committed cutting and inspection. Sources: the repository's approved game design, curriculum alignment and ruler interaction contracts. Student action, evidence records and scaffolding are unchanged. Room reference dimensions, tray labeling and camera composition are presentation refinements, not new curriculum requirements or mastery claims. The original recipe geometry, course links, historical artifacts and public deployment remain preserved.
