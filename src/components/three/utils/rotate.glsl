mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}


#pragma glslify: export(rotation3dY)

mat3 rotation3dX(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, s,
    0.0, -s, c
  );
}

#pragma glslify: export(rotation3dX)