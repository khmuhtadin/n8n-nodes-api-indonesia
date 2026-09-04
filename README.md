# n8n-nodes-api-indonesia

An n8n community node for [API Indonesia](https://apiindonesia.id) - Indonesian public data API covering administrative regions, prayer times, earthquakes, weather, exchange rates, halal certification, BPOM products, Quran, Bible, and more.

## Installation

In n8n, go to **Settings > Community Nodes > Install** and enter:

```
n8n-nodes-api-indonesia
```

## Authentication

1. Get an API key from the [API Indonesia dashboard](https://dashboard.apiindonesia.id).
2. In n8n, create a new credential of type **API Indonesia API**.
3. Paste your API key (starts with `aip_live_`).
4. The Base URL defaults to `https://use.apiindonesia.id`. Override only for dev/staging.

## Supported Resources

- Region (provinces, regencies, districts, villages)
- Prayer Times
- Earthquake
- Weather
- Exchange Rate
- Holiday
- Postal Code
- School
- University
- Hospital
- Quran
- Bible
- KBBI (dictionary)
- Plate (vehicle license plates)
- UMP (minimum wages)
- Halal (halal certification)
- BPOM (BPOM products)
- Hijriah (Hijri calendar)
- Astronomy (sun, moon, eclipses)
- OJK Invest (investment products)
- Early Warning (BMKG early warnings)
- BI Exchange Rate (Bank Indonesia rates)
- Validation (NIK, NPWP, bank, phone validators)
- Util (utilities)

## Usage Examples

### Get all provinces

1. Add the **API Indonesia** node to your workflow.
2. Select **Resource**: Region.
3. Select **Operation**: Get All Provinces.
4. Toggle **Return All Results** to fetch all provinces.
5. Execute the node.

### Get prayer times for a city

1. Add the **API Indonesia** node.
2. Select **Resource**: Prayer Times.
3. Select **Operation**: Get Prayer Times.
4. Use the **Regency ID** dropdown to search and select a city.
5. Enter a date (YYYY-MM-DD format).
6. Execute.

### Search schools by name

1. Add the **API Indonesia** node.
2. Select **Resource**: School.
3. Select **Operation**: Search Schools.
4. Enter a search query.
5. Toggle **Return All Results** or set a limit.
6. Execute.

## API Documentation

Full API documentation is available at [https://docs.apiindonesia.id](https://docs.apiindonesia.id).

## License

MIT