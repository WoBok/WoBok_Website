var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
/*** If in some cases it is necessary to ignore null values in JSON responses. ***/
/*** This will be ignore at the application level. ***/
//    .AddJsonOptions(options => options.JsonSerializerOptions.DefaultIgnoreCondition =
//    System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull
//    );
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
