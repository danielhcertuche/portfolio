from dash import Dash, dcc, html, Input, Output
import pandas as pd
import os
import plotly.express as px

# Inicializar la aplicación Dash
app = Dash(__name__)

# Directorio de datos
data_dir = os.path.join(os.getcwd(), "data")

# Nombre de los archivos
halo_files = ['dhc_halo_11.gas', 'dhc_halo_17.gas']

# Cargar todos los archivos en un DataFrame combinado
all_data = {}
for file in halo_files:
    file_path = os.path.join(data_dir, file)
    df = pd.read_csv(file_path, sep=' ', 
                     names=['x', 'y', 'z', 'vx', 'vy', 'vz', 'lxvel', 'lyvel', 'lzvel', 'Potential', 'U', 'rho'],
                     header=None)
    all_data[file] = df

# Layout de la aplicación Dash
app.layout = html.Div(
    [
        html.H1("", style={"textAlign": "center"}),

        # Dos columnas para gráficos y controles independientes
        html.Div(
            [
                # Columna izquierda
                html.Div(
                    [
                        html.Div(
                            [
                                html.Label("Select a file:", style={"fontWeight": "bold", "color": "black"}),
                                dcc.Dropdown(
                                    id="file-dropdown-left",
                                    options=[{"label": file, "value": file} for file in halo_files],
                                    value=halo_files[0],
                                    style={"width": "70%", "marginBottom": "10px"}
                                ),
                                html.Label("Select X-axis parameter:", style={"fontWeight": "bold", "color": "blue"}),
                                dcc.Dropdown(
                                    id="x-axis-dropdown-left",
                                    options=[{"label": col, "value": col} for col in ['x', 'y', 'z', 'vx', 'vy', 'vz', 'Potential', 'rho']],
                                    value='x',
                                    style={"width": "40%", "marginBottom": "10px"}
                                ),
                                html.Label("Select Y-axis parameter:", style={"fontWeight": "bold", "color": "blue"}),
                                dcc.Dropdown(
                                    id="y-axis-dropdown-left",
                                    options=[{"label": col, "value": col} for col in ['x', 'y', 'z', 'vx', 'vy', 'vz', 'Potential', 'rho']],
                                    value='y',
                                    style={"width": "40%", "marginBottom": "20px"}
                                ),
                            ],
                            style={"padding": "10px", "border": "2px solid blue", "borderRadius": "10px"}
                        ),
                        dcc.Graph(id="scatter-plot-left", style={"height": "85vh", "width": "85%"})
                    ],
                    style={
                        "flex": "1", 
                        "minWidth": "300px", 
                        "margin": "10px",
                        "display": "flex", 
                        "flexDirection": "column"
                    }
                ),

                # Columna derecha
                html.Div(
                    [
                        html.Div(
                            [
                                html.Label("Select a file:", style={"fontWeight": "bold", "color": "black"}),
                                dcc.Dropdown(
                                    id="file-dropdown-right",
                                    options=[{"label": file, "value": file} for file in halo_files],
                                    value=halo_files[1],
                                    style={"width": "70%", "marginBottom": "10px"}
                                ),
                                html.Label("Select X-axis parameter:", style={"fontWeight": "bold", "color": "green"}),
                                dcc.Dropdown(
                                    id="x-axis-dropdown-right",
                                    options=[{"label": col, "value": col} for col in ['x', 'y', 'z', 'vx', 'vy', 'vz', 'Potential', 'rho']],
                                    value='x',
                                    style={"width": "40%", "marginBottom": "10px"}
                                ),
                                html.Label("Select Y-axis parameter:", style={"fontWeight": "bold", "color": "green"}),
                                dcc.Dropdown(
                                    id="y-axis-dropdown-right",
                                    options=[{"label": col, "value": col} for col in ['x', 'y', 'z', 'vx', 'vy', 'vz', 'Potential', 'rho']],
                                    value='y',
                                    style={"width": "40%", "marginBottom": "20px"}
                                ),
                            ],
                            style={"padding": "10px", "border": "2px solid green", "borderRadius": "10px"}
                        ),
                        dcc.Graph(id="scatter-plot-right", style={"height": "85vh", "width": "85%" })
                    ],
                    style={
                        "flex": "1", 
                        "minWidth": "300px", 
                        "margin": "10px",
                        "display": "flex", 
                        "flexDirection": "column"
                    }
                )
            ],
            style={
                "display": "flex", 
                "flexWrap": "wrap",  # Permite que las columnas se apilen si no hay suficiente espacio
                "justifyContent": "space-between", 
                "gap": "20px"
            }
        )
    ],
    style={"padding": "20px"}  # Padding global
)

# Callbacks para actualizar los gráficos de manera independiente
@app.callback(
    Output("scatter-plot-left", "figure"),
    [Input("file-dropdown-left", "value"),
     Input("x-axis-dropdown-left", "value"),
     Input("y-axis-dropdown-left", "value")]
)
def update_plot_left(selected_file, x_param, y_param):
    df = all_data[selected_file]
    fig = px.scatter(
        df, x=x_param, y=y_param, 
        title=f"{y_param} vs {x_param} (Left Plot)",
        labels={x_param: x_param, y_param: y_param},
        hover_data={"Potential": True, "rho": True}
    )
    fig.update_traces(marker=dict(size=1))  # Hacer los puntos más pequeños
    fig.update_layout(
        title_x=0.5  # Centrar el título
    )
    return fig


@app.callback(
    Output("scatter-plot-right", "figure"),
    [Input("file-dropdown-right", "value"),
     Input("x-axis-dropdown-right", "value"),
     Input("y-axis-dropdown-right", "value")]
)
def update_plot_right(selected_file, x_param, y_param):
    df = all_data[selected_file]
    fig = px.scatter(
        df, x=x_param, y=y_param,
        title=f"{y_param} vs {x_param} (Right Plot)",
        labels={x_param: x_param, y_param: y_param},
        hover_data={"Potential": True, "rho": True}
    )
    fig.update_traces(marker=dict(size=1))  # Hacer los puntos más pequeños
    fig.update_layout(
        title_x=0.5  # Centrar el título
    )
    return fig

# Ejecutar la aplicación
if __name__ == "__main__":
    app.run_server(debug=True)
