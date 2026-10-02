# Public Classroom Hotfix Review

[Playable ZIP](0.1.0_Predict-Cut-Inspect_pr-26_build-003_20261002T151336Z_gc8484ff65820_web.zip) - [Wood Clearance](free-play-clear.png) - [Learn Completion](learn-complete.png) - [All Hashes](artifact-manifest.json)

Build: 0.1.0_Predict-Cut-Inspect_pr-26_build-003_20261002T151336Z_gc8484ff65820_web

Clean source: c8484ff6582020b19225a3376cc9e254a82890d5. The later evidence commit preserves this immutable artifact; it does not rebuild or relabel it. Extract all files and run **Start PR26 Review.cmd** with Node installed, then open http://127.0.0.1:18471/. This is a separate local review, not the Pages deployment.

Try Free Play with1/16 and3 inches, retain several lengths and duplicate. Stock and retained wood stay clear of the shallow front tray. The decorative floating saw grip is removed. In Learn, correct Cut -> held inspection -> Keep Piece -> placement -> existing reasoning where required -> automatic next guided/practice task. Wrong cuts stay on the task; wrong reasoning preserves the original and offers a supported retry. All ten stages are needed for Lessons Complete. Scroll inside the left instruction card on a short screen.

18 unit tests and exact17-piece house passed. This build passed565 actual-bound clearance samples,9 varied Free Play cuts plus a duplicate,full/reduced animation,all ten Learn stages/reasoning retries/completion/restart/manual-last-lesson cases,the original house,all6 Challenge checks and actual JSON export. Assessment-integrity regressions passed. Pages build 0.1.0_Predict-Cut-Inspect_pr-26_build-004_20261002T151336Z_gc8484ff65820_pages from the same source passed the /MeasureTwice/ subpath browser check. No errors or external game requests. Fictional test sessions only.

The five lesson/question definitions,house geometry,UI labels and Pages workflow are unchanged. Existing camera wall clipping remains outside this hotfix; Home View restores the scene. Existing anonymous export is current-mode raw JSON,not the expanded completion report. Full current-game instructions remain valid, except Learn advances automatically after accepted tasks. No expanded PR20/23/24 features are included.

Rollback source:23463ad0d5034cf14f3a6dc8a304122ee959ad25. Revert the hotfix merge if rollback is needed; deployment must receive its own new production identity. Asset provenance is preserved in [the handoff](asset-handoff.json); central GraphicsStorage is untouched.
