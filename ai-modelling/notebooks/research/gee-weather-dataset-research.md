# Weather Dataset Exploration for Bushfire Forecasting

## 1. Introduction
This report presents an exploration of weather datasets available in the Google Earth Engine (GEE) weather catalog for use in bushfire forecasting. These datasets serve as the primary source of input features for the forecasting model, providing key weather variables such as temperature, wind, humidity, and precipitation.

A range of datasets were reviewed and evaluated based on their temporal resolution, spatial coverage, data type, and availability of these core variables. From this exploration, several candidate datasets were identified and selected for further comparison to determine their suitability for building a basic bushfire forecasting model.

---

## 2. Bushfire Modelling Requirements
Bushfire behaviour can be understood through three main aspects: ignition, spread, and intensity. Weather conditions directly influence all three.

Among available weather variables, temperature, wind, humidity, and precipitation have the most direct impact on these factors. High temperature and low humidity dry out vegetation, increasing ignition likelihood and fire intensity. Wind strongly affects fire spread by supplying oxygen and determining the speed and direction of fire movement. Precipitation influences fuel moisture over time, where low rainfall leads to dry conditions that increase fire risk.

For these reasons, these four variables are considered core features for developing a basic but functional bushfire forecasting model.

---

## 3. Dataset Selection Criteria
To identify suitable datasets, the following criteria were used:

- Temporal resolution (e.g. hourly, 6-hourly)  
- Spatial resolution (data granularity)  
- Data type (reanalysis vs forecast)  
- Availability of core variables (temperature, wind, humidity, precipitation)  

Datasets that satisfy these criteria are more suitable for modelling fire behaviour effectively.

---

## 4. Dataset Exploration (GEE Weather Catalog)
All datasets available within the GEE weather catalog were initially reviewed to understand their characteristics, including temporal resolution, spatial resolution, and available variables.

Based on the defined selection criteria, datasets were filtered to identify those that provide the core weather variables required for bushfire forecasting.

From this process, a subset of candidate datasets was selected for further analysis. In particular, ERA5, CFSR, CFSv2, and GFS were chosen as primary candidates, as they offer suitable temporal resolution and include the key variables needed for modelling.

---

## 5. Dataset Comparison

| Dataset | Frequency | Type | Spatial Coverage | Time Span | Granularity | Core Variables | Accessibility | Suitability |
|--------|----------|------|------------------|----------|-------------|----------------|--------------|-------------|
| CFSR   | 6-hourly | Reanalysis | Global | 2018–2026 | 55 km | Precipitation, Humidity, Temperature, Wind | GEE | Suitable |
| CFSv2  | 6-hourly | Forecast/Reanalysis | Global | 1979–2026 | 22 km | Precipitation, Humidity, Temperature, Wind | GEE | Moderate |
| ERA5   | Hourly   | Reanalysis | Global | 1940–2026 | 27 km | Precipitation, Humidity, Temperature, Wind | GEE | Highly Suitable |
| GFS    | 1–3 hourly | Forecast | Global | 2015–2026 | 28 km | Precipitation, Humidity, Temperature, Wind | GEE | Better for Prediction |

---

## 6. Discussion
All selected datasets provide the required core variables for bushfire forecasting. However, they differ in temporal resolution, spatial resolution, and data type, which affects their suitability.

ERA5 provides hourly data, allowing it to capture short-term changes in weather conditions more effectively than 6-hourly datasets such as CFSR and CFSv2. Although ERA5 and CFSR have similar spatial resolution, ERA5 is generally preferred due to its higher temporal resolution and improved consistency as a reanalysis dataset.

CFSv2 provides similar variables but includes forecast components, which may introduce additional uncertainty when used for model training. GFS offers high-frequency data but is primarily designed for forecasting future conditions, making it more suitable for prediction rather than training.

This comparison highlights that temporal resolution and data consistency play a more critical role than small differences in spatial resolution when selecting datasets for modelling short-term fire dynamics.

---

## 7. Conclusion
The analysis shows that while multiple datasets in the GEE weather catalog provide the required weather variables, they vary in their resolution and data characteristics.

ERA5 offers the best balance of temporal resolution, consistency, and completeness, making it the most suitable dataset for developing a basic bushfire forecasting model.

Other datasets such as CFSR and CFSv2 can still be used as alternatives, while GFS is more appropriate for forecasting applications rather than model training.