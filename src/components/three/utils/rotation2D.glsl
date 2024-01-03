mat3 rotation2D(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    c, s, 0.0,
    -s, c, 0.0,
    0.0, 0.0, 1.0
  );
}

#pragma glslify: export(rotation2D)