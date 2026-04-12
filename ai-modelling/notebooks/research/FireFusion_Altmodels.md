**FireFusion**

**Bushfire Spread Modelling | Model Considerations**

Chum De Silva | T1 2026

Deakin University

# Overview

FireFusion's spread modelling uses a three-tier progression. Each tier builds on the same open-source data pipeline. No proprietary data or paid APIs are required at any stage.

# Recommendations for Fire Fusion Modelling

| **Tier** | **Model** | **Time Series** | **Complexity** | **Timeline** |
| --- | --- | --- | --- | --- |
| Baseline | LSTM / GRU | Medium (with lagged features) | Low | Trimester 1 2026 |
| Primary | CNN-BiLSTM | Strong | Medium-High | Trimester 2 2026 |
| Research | ConvLSTM + PCNN | Very Strong | High | Future |

The pipeline built for the LSTM baseline (FIREWEB perimeters, BOM weather, DEM, NDVI) feeds directly into CNN-BiLSTM with minimal refactoring. Starting simple should not a compromise but a sequence in building a model to improve upon the last

# 2. Time Series Capability

## 2.1 LSTM / GRU Baseline Model

The LSTM processes a time series of feature vectors. This captures how conditions evolve over time rising FFDI, sustained wind, cumulative drought. The GRU is a simpler variant that trains faster with comparable performance and is recommended for the baseline build.

### Pros

* Simplest deep learning architecture, under 100 lines of PyTorch
* Captures multi-day trends: rising FFDI, sustained wind, cumulative drying effect
* GRU variant trains faster than LSTM with comparable accuracy
* Works on CPU for small study areas, no GPU required for the baseline
* Extensive open-source examples for weather and fire time series available

### Cons

* No native spatial awareness, each cell is processed independently
* Struggles with sequences longer than 30 days due to gradient decay
* Assumes regular timestep intervals, BOM data gaps require preprocessing
* Cannot produce multi-step ahead predictions, one timestep at a time
* Spatial context must be added manually as engineered neighbour features

Workaround for spatial limitation: include the fire state of the four neighbouring cells (north, south, east, west) as input features. This gives the LSTM basic fire front context without requiring a CNN stage.

## 2.2 CNN-BiLSTM, for future considerations

CNN layers extract spatial features from each timestep's. A Bidirectional LSTM then processes the sequence of CNN-encoded states across time.

The bidirectional component reads sequences both forward and backward during training, producing better learned representations of fire behaviour dynamics. Marjani et al. (2024) applied this in Australia for next-day spread prediction, outperforming standard LSTM and ConvLSTM.

### Pros

* Australian literature precedent, Marjani et al. (2024) applied in Australia, directly relevant to Victorian conditions
* Captures spatial fire front context through CNN, no manual neighbour feature engineering needed
* BiLSTM captures multi-day fire behaviour trends and fire momentum
* 4-day input window proven in Australian context; longer windows improve performance
* Same data pipeline as LSTM baseline — same features, restructured as spatial grids

### Cons

* Requires aligned spatio-temporal data cubes, all rasters must match grid, resolution, and time cadence
* More hyperparameters to tune than LSTM: CNN depth, BiLSTM layers, dropout, window size
* Spatial features are compressed to a flat vector before the LSTM — indirect spatial-temporal interaction
* Interpretability reduced, SHapley Additive exPlanations (SHAP) must be applied to the final dense layer

## 2.3 ConvLSTM and PCNN

ConvLSTM replaces the matrix multiplications in LSTM gates with convolution operations. The hidden state itself becomes a spatial grid, so spatial patterns and temporal dynamics are learned jointly. The PCNN extension adds McArthur-derived physics constraints to the loss function to improve generalisation to extreme fire conditions like those seen during Black Summer 2019-2020.

### Pros

* Native spatiotemporal learning — spatial and temporal dynamics learned jointly, not in separate stages
* Multi-step ahead prediction is native — generates t+6h, t+12h, t+24h maps from one model
* PCNN physics constraints address generalisation to **extreme fire conditions** outside the training distribution
* Kondylatos et al. (2022) achieved **AUC 0.926** on next-day wildfire prediction
* Physics constraints are soft monotonic penalties — no full fire physics equations required

### Cons

* Highest implementation complexity of the three tiers
* Requires clean, gap-filled, strictly aligned spatio-temporal cubes
* GPU required; more memory intensive than CNN-BiLSTM
* PCNN physics loss terms require domain expertise to formulate correctly
* Lowest interpretability — requires Integrated Gradients or DeepSHAP

PCNN physics constraints to implement for fire spread: (1) higher FFDI must always predict faster spread; (2) predicted spread must be weighted downwind; (3) uphill spread must be faster than downhill; (4) higher fuel moisture must reduce spread rate. All four are monotonic soft penalties. Reference: Kameyama et al. (2026).

# 3. Feature Considerations

## 3.1 LSTM Baseline Features Considerations

12 core features. Lagged versions compensate for the LSTM's lack of spatial awareness.

| **Feature** | **Role in Spread** | **Lagged?** |
| --- | --- | --- |
| Wind speed (km/h) | Primary spread driver | t-1, t-2, t-3 |
| Wind direction | Determines spread direction | t-1, t-2 |
| FFDI | Australian danger composite | t-1, t-2, t-3 |
| Max temperature | Fuel drying rate | 3-day trend |
| Relative humidity | Fuel moisture proxy | t-1 |
| Slope | 20 deg slope = 4x spread rate | Static |
| Aspect | North-facing slopes drier in Victoria | Static |
| NDVI | Vegetation health and fuel dryness | Monthly |
| Land cover / fuel type | Spread rate category | Static |
| Time since last fire | Fuel accumulation proxy | Static |
| Current fire perimeter | Active spread front | t-1, t-2 |
| Neighbour cell fire state | Spatial context for LSTM | t-1 |

## 3.2 Tier 2 Additional Features for CNN-BiLSTM

No new data sources needed. Same pipeline restructured as spatio-temporal grids.

| **Feature** | **Source** | **Why It Adds Value** |
| --- | --- | --- |
| Multi-day weather sequences (4-14 days) | BOM historical grids | BiLSTM exploits temporal trends across days |
| FIRMS hotspot time series | NASA FIRMS — free archive | Fire progression history feeds LSTM memory |
| Live Fuel Moisture (LFMC) | Yebra ANU product — free | Physically grounded moisture; Australian validated |
| Cumulative rainfall deficit (30 days) | BOM derived | Drought signal accumulating over time |
| Vapour Pressure Deficit (VPD) | ERA5 reanalysis — free via CDS | More sensitive fuel stress indicator than RH |

## 3.3 Additional Features for ConvLSTM + PCNN

Physics-grounded features that enable the PCNN loss function constraints.

| **Feature** | **Source** | **Why It Adds Value** |
| --- | --- | --- |
| Rate of Spread (ROS) | Calculated — Cruz et al. (2015) equations | Enables PCNN monotonicity constraint |
| Fireline intensity | Calculated from ROS and fuel load | Crown fire transition indicator |
| Dead Fuel Moisture Code | Derived from BOM temperature and RH | Time-lagged fuel drying; more accurate than RH |
| High-res NDVI (Sentinel-2 10m) | Google Earth Engine — free | Fine-scale fuel heterogeneity |

# 4. Evaluation Metrics

Metrics are grouped by what they measure. Spatial accuracy is as important as classification accuracy for fire spread — predicting the right probability in the wrong location is operationally useless.

## 4.1 Classification Metrics

| **Metric** | **What It Measures** | **Priority** |
| --- | --- | --- |
| AUC-ROC | Overall discrimination; handles class imbalance well | High |
| AUC-PR | Better than ROC when fire events are rare | High |
| F1 Score | Balance of precision and recall | High |
| Recall (Sensitivity) | Missed fires — most dangerous failure mode | Critical |
| Precision | False alarms — important for resource allocation | Medium |
| Critical Success Index | Penalises both false alarms and misses | High |

## 4.2 Spatial Accuracy Metrics

| **Metric** | **What It Measures** | **Priority** |
| --- | --- | --- |
| Intersection over Union (IoU) | Overlap of predicted vs actual burned area polygon | Critical |
| Dice Coefficient | Segmentation quality for burn perimeter shape | High |
| False Negative Rate | Underprediction of spread — most dangerous failure | Critical |
| False Positive Rate | Overprediction — affects evacuation decisions | Medium |
| Hausdorff Distance | Maximum gap between predicted and actual perimeter | Medium |

## 4.3 Temporal Accuracy Metrics

| **Metric** | **What It Measures** |
| --- | --- |
| MAE (Mean Absolute Error) | Average spread distance or burn area prediction error |
| RMSE (Root Mean Squared Error) | Spread rate error; sensitive to large under-predictions |
| R squared | Variance in spread rate explained by the model |
| Spearman Rank Correlation | Whether model correctly orders severity across fire events |

## 4.4 Validation Strategy

| **Strategy** | **When to Use** |
| --- | --- |
| K-Fold Cross-Validation (k=5) | Baseline LSTM , sufficient for tabular feature data |
| Spatial Hold-Out | All tiers prevents spatial autocorrelation leaking into results |
| Temporal Hold-Out | All tiers train on historical years, test on most recent season |
| Out-of-Distribution Test | ConvLSTM + PCNN validates generalisation to extreme fire events |

# 5. Model Complexity

| **Criterion** | **LSTM / GRU** | **CNN-BiLSTM** | **ConvLSTM + PCNN** |
| --- | --- | --- | --- |
| Hardware needed | CPU only | GPU recommended | GPU required |
| Training time | Minutes to hours | Hours | Hours to days |
| Libraries required | PyTorch | PyTorch | PyTorch |
| Data format | Tabular CSV + simple grid | Spatio-temporal cubes | Aligned ST cubes (strict) |
| Missing data | Simple imputation | Preprocessing required | Must be gap-filled |
| Hyperparameters | ~6 | ~12 | ~15 plus physics lambda |
| Lines of code (est.) | 80-120 lines | 200-300 lines | 400+ lines |
| Interpretability | High SHAP direct | Medium layer SHAP | Low Integrated Gradients |
| Time series rating | 7 / 10 | 7.5 / 10 | 8.5 / 10 |
| Spatial modelling | Manual features only | CNN per timestep | Native spatiotemporal |
| Multi-step ahead | No | No | Yes native |
| Implementation effort | Low days | Medium weeks | High months |
| Literature (AU) | Dutta et al. 2013 | Marjani et al. 2024 | Kondylatos et al. 2022 |

# 6. Recommendation

Begin FireFusion with LSTM or GRU. . Add the four neighbouring cell fire states as features to give it basic spatial framework. Validate against FIREWEB historical fires using IoU and AUC-ROC.

Once the baseline is validated and the data pipeline is stable, upgrade to CNN-BiLSTM. The same features and data sources carry across, the main engineering task is restructuring the inputs as spatio-temporal grids. Follow the Marjani et al. (2024) architecture as the blueprint.

Build toward ConvLSTM with PCNN physics constraints as the research contribution. This is where FireFusion can make a genuine contribution, a physically constrained model that generalises to extreme fire conditions beyond the training data.

**References:**

Bergado, J. R., Persello, C., Reinke, K., & Stein, A. (2021). Predicting wildfire burns from big geodata using deep learning. *Safety Science*, 140, 105276. <https://doi.org/10.1016/j.ssci.2021.105276>

Burge, J., Bonanni, M., Ihme, M., & Hu, L. (2021). Convolutional LSTM neural networks for modeling wildland fire dynamics. *arXiv preprint arXiv:2012.06679*. <https://arxiv.org/abs/2012.06679>

Cho, K., van Merrienboer, B., Gulcehre, C., Bahdanau, D., Bougares, F., Schwenk, H., & Bengio, Y. (2014). Learning phrase representations using RNN encoder-decoder for statistical machine translation. *arXiv preprint arXiv:1406.1078*. <https://arxiv.org/abs/1406.1078>

Cruz, M., Gould, J., Alexander, M., Sullivan, A., McCaw, W., Matthews, S., & Land, C. (2015). *A guide to rate of fire spread models for Australian vegetation*. Australasian Fire and Emergency Service Authorities Council.

Dutta, R., Aryal, J., Das, A., & Kirkpatrick, J. B. (2013). Deep cognitive imaging systems enable estimation of continental-scale fire incidence from climate data. *Scientific Reports*, 3, 3188. <https://doi.org/10.1038/srep03188>

Hollis, J. J., Matthews, S., Fox-Hughes, P., Grootemaat, S., Heemstra, S., Kenny, B. J., & Sauvage, S. (2024). Introduction to the Australian fire danger rating system. *International Journal of Wildland Fire*, 33. <https://doi.org/10.1071/WF23089>

Kameyama, R., Manzello, S. L., & Suzuki, S. (2026). Prediction of firebrand transport using machine learning and physics-constrained neural networks. *Fire Safety Journal*, 162, 104691. <https://doi.org/10.1016/j.firesaf.2026.104691>

Kadir, E. A., Kung, H. T., AlMansour, A. A., Irie, H., Rosa, S. L., & Fauzi, S. S. M. (2023). Wildfire hotspots forecasting and mapping for environmental monitoring based on the long short-term memory networks deep learning algorithm. *Environments*, 10, 124. <https://doi.org/10.3390/environments10070124>

Kondylatos, S., Prapas, I., Ronco, M., Papoutsis, I., Camps-Valls, G., Piles, M., Fernández-Torres, M. A., & Carvalhais, N. (2022). Wildfire danger prediction and understanding with deep learning. *Geophysical Research Letters*, 49, e2022GL099368. <https://doi.org/10.1029/2022GL099368>

Li, Z., Huang, Y., Li, X., & Xu, L. (2021). Wildland fire burned areas prediction using long short-term memory neural network with attention mechanism. *Fire Technology*, 57(1), 1–23. <https://doi.org/10.1007/s10694-020-01028-3>

Li, Z., Zhang, M., Zhang, S., Liu, J., Sun, S., Hu, T., & Sun, L. (2022). Simulating forest fire spread with cellular automation driven by a LSTM based speed model. *Fire*, 5(1), 13. <https://doi.org/10.3390/fire5010013>

Marjani, M., Ahmadi, S. A., & Mahdianpari, M. (2023). FirePred: A hybrid multi-temporal convolutional neural network model for wildfire spread prediction. *Ecological Informatics*, 78, 102282. <https://doi.org/10.1016/j.ecoinf.2023.102282>

Marjani, M., Mahdianpari, M., & Mohammadimanesh, F. (2024). CNN-BiLSTM: A novel deep learning model for near-real-time daily wildfire spread prediction. *Remote Sensing*, 16(8), 1467. <https://doi.org/10.3390/rs16081467>

McArthur, A. G. (1967). *Fire behaviour in eucalypt forests*. Forestry and Timber Bureau, Department of National Development, Canberra, Australia.

Radke, D., Hessler, A., & Ellsworth, D. (2019). FireCast: Leveraging deep learning to predict wildfire spread. *Proceedings of the 28th International Joint Conference on Artificial Intelligence (IJCAI)*, 4575–4581. <https://doi.org/10.24963/ijcai.2019/636>

Rösch, M., Nolde, M., Ullmann, T., & Riedlinger, T. (2024). Data-driven wildfire spread modeling of European wildfires using a spatiotemporal graph neural network. *Fire*, 7(7), 207. <https://doi.org/10.3390/fire7070207>

Shi, X., Chen, Z., Wang, H., Yeung, D. Y., Wong, W. K., & Woo, W. C. (2015). Convolutional LSTM network: A machine learning approach for precipitation nowcasting. *Advances in Neural Information Processing Systems*, 28. <https://proceedings.neurips.cc/paper/2015>

Sun, X., Li, N., Chen, D., Chen, G., Sun, C., Shi, M., Gao, X., Wang, K., & Hezam, I. M. (2024). A forest fire prediction model based on cellular automata and machine learning. *IEEE Access*. <https://doi.org/10.1109/ACCESS.2024.3359202>

Xu, Z., Li, J., Cheng, S., Rui, X., Zhao, Y., He, H., & Xu, L. (2024). Wildfire risk prediction: A survey of recent advances using deep learning techniques. *arXiv preprint arXiv:2405.01607*. <https://arxiv.org/abs/2405.01607>

Yebra, M., Quan, X., Riaño, D., Larraondo, P. R., van Dijk, A. I., & Cary, G. J. (2018). A fuel moisture content and flammability monitoring methodology for continental Australia based on optical remote sensing. *Remote Sensing of Environment*, 212, 260–272. <https://doi.org/10.1016/j.rse.2018.04.053>

Zhang, G., Wang, M., & Liu, K. (2022). Dynamic prediction of global monthly burned area with hybrid deep neural networks. *Ecological Applications*, 32, e2610. <https://doi.org/10.1002/eap.2610>