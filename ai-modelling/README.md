# FireFusion AI Modeling

This repository contains the AI modelling components for the FireFusion project: 

- model code, 
- ETL/feature engineering,
- lightweight FastAPI for model-serving and integration.

## What's in each folder

- `api/`: FastAPI app to serve models and expose endpoints for other services.
  - `main.py`: application entrypoint.
  - `routers/`: endpoint modules (recommended: `health.py`, `predict.py`).
  - `schemas/`: Pydantic models for request/response validation.
  - `dependencies.py`: shared DI logic (model loader, DB sessions).
- `src/`:
  - `data/`: ETL and data preprocessing code (GEE ingestion, resampling).
  - `models/`: model definitions and architecture code.
  - `training/`: training scripts, evaluation, checkpointing.
  - `utils/`: miscellaneous helpers used across modules.
- `notebooks/`: exploratory and research notebooks.
- `config/`: JSON/YAML configs and hyperparameters.
- `data/`: small sample datasets for local dev (add to `.gitignore`).
- `tests/`: unit and integration tests.

## Quick start (local development)

1. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate