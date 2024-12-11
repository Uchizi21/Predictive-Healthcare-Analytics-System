from fhirclient import client
from fhirclient.models.patient import Patient

# FHIR server settings
settings = {
    'app_id': 'health_analytics_app',
    'api_base': 'https://r4.smarthealthit.org/'  # Public test server
}

smart = client.FHIRClient(settings=settings)

try:
    # Search for all patients (adjust query parameters as needed)
    search = Patient.where(struct={})
    results = search.perform_resources(smart.server)

    for patient in results:
        print(f"Patient ID: {patient.id}")
except Exception as e:
    print(f"An error occurred while fetching patient IDs: {e}")
