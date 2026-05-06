#!/bin/bash
# 📥 Download Real Train Photos Script
set -e

IMG_DIR="/usr/local/google/home/melvinp/trains-atlas/src/assets/trains"
mkdir -p "$IMG_DIR"

echo "=================================================="
echo "📥 DOWNLOADING REAL TRAIN PHOTOS FROM WIKIMEDIA..."
echo "=================================================="

curl -s -L -o "$IMG_DIR/shinkansen.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/E5_series_U4_20111025.jpg/640px-E5_series_U4_20111025.jpg"
curl -s -L -o "$IMG_DIR/maglev.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/L0_Series_Maglev_Train_201811.jpg/640px-L0_Series_Maglev_Train_201811.jpg"
curl -s -L -o "$IMG_DIR/bigboy.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/UP_4014_Union_Pacific_Big_Boy_Steam_Locomotive.jpg/640px-UP_4014_Union_Pacific_Big_Boy_Steam_Locomotive.jpg"
curl -s -L -o "$IMG_DIR/acela.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Amtrak_Acela_Express_in_Mansfield%2C_MA.jpg/640px-Amtrak_Acela_Express_in_Mansfield%2C_MA.jpg"
curl -s -L -o "$IMG_DIR/tgv.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/TGV_Duplex_in_Paris-Gare-de-Lyon.jpg/640px-TGV_Duplex_in_Paris-Gare-de-Lyon.jpg"
curl -s -L -o "$IMG_DIR/scotsman.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flying_Scotsman_in_2016.jpg/640px-Flying_Scotsman_in_2016.jpg"
curl -s -L -o "$IMG_DIR/eurostar.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Eurostar_e320_St_Pancras.jpg/640px-Eurostar_e320_St_Pancras.jpg"
curl -s -L -o "$IMG_DIR/vandebharat.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Vande_Bharat_Express_train.jpg/640px-Vande_Bharat_Express_train.jpg"
curl -s -L -o "$IMG_DIR/darjeeling.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Darjeeling_Himalayan_Railway_Toy_Train.jpg/640px-Darjeeling_Himalayan_Railway_Toy_Train.jpg"
curl -s -L -o "$IMG_DIR/ice.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/ICE_4_in_M%C3%BCnchen_Hbf.jpg/640px-ICE_4_in_M%C3%BCnchen_Hbf.jpg"
curl -s -L -o "$IMG_DIR/wuppertal.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Wuppertaler_Schwebebahn_GTW_15_Alte_Freiheit.jpg/640px-Wuppertaler_Schwebebahn_GTW_15_Alte_Freiheit.jpg"
curl -s -L -o "$IMG_DIR/glacier.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Glacier_Express_Landwasser_Viaduct.jpg/640px-Glacier_Express_Landwasser_Viaduct.jpg"
curl -s -L -o "$IMG_DIR/bernina.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Bernina_Express_Brusio_spiral_viaduct.jpg/640px-Bernina_Express_Brusio_spiral_viaduct.jpg"
curl -s -L -o "$IMG_DIR/ghan.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/The_Ghan_near_Alice_Springs.jpg/640px-The_Ghan_near_Alice_Springs.jpg"
curl -s -L -o "$IMG_DIR/puffing.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Puffing_Billy_Lakeside.jpg/640px-Puffing_Billy_Lakeside.jpg"
curl -s -L -o "$IMG_DIR/canadian.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Via_Rail_Canadian_near_Jasper.jpg/640px-Via_Rail_Canadian_near_Jasper.jpg"
curl -s -L -o "$IMG_DIR/madaraka.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/SGR_Kenya_Train_at_Mombasa_Terminus.jpg/640px-SGR_Kenya_Train_at_Mombasa_Terminus.jpg"

echo "--------------------------------------------------"
echo "✅ ALL 17 IMAGES DOWNLOADED SUCCESSFULLY!"
echo "=================================================="
ls -l "$IMG_DIR"
