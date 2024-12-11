import numpy as np
from scipy.integrate import odeint
import matplotlib.pyplot as plt

# Define the differential equations
def glucose_insulin_dynamics(y, t, k1, k2):
    glucose, insulin = y
    dydt = [-k1 * glucose + k2 * insulin, k1 * glucose - k2 * insulin]
    return dydt

# Initial conditions
y0 = [100, 10]  # Initial glucose and insulin levels
t = np.linspace(0, 10, 100)  # Time points

# Solve the equations
solution = odeint(glucose_insulin_dynamics, y0, t, args=(0.1, 0.05))

# Plot results
plt.plot(t, solution[:, 0], label='Glucose')
plt.plot(t, solution[:, 1], label='Insulin')
plt.legend()
plt.xlabel('Time')
plt.ylabel('Concentration')
plt.title('Disease Progression Simulation')
plt.show()
