/**
 * seed-annales-2024.js
 * Importe les annales BAC 2024 – données embarquées directement (pas de fichier externe).
 * Clés compactes: T=Type, G=Groupe, M=Mois source, L=Libellé, U=URL PDF, S=Séries détectées
 */

import process from 'node:process';
import { v4 as uuidv4 } from 'uuid';
import { pool, testDatabaseConnection } from './pool.js';

const MANIFEST = [
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Espagnol STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/esp-steg-rempl-1er-gr-24.pdf",
    "S": "STEG"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "PORTUGAIS LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/portugais-lv1-1er-gr-.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "CIV LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/sujet-1-CIV-LA_Vu-2024GL39NA0143.pdf",
    "S": "LA"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "DROIT STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Droit-steg-rempl-1er-gr-24.pdf",
    "S": "STEG"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Civ S1A S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/civilisation-S1A-S2A-REMPL-1ER-GR-24.pdf",
    "S": "\"S1A"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Mang Org STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Management-des-organi-Rempl-1er-gr-24.pdf",
    "S": "STEG"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Anglais STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/anglais-steg-rempl-1er-gr-24.pdf",
    "S": "STEG"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Anglais S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ANGLAIS-S-REMPL-1ER-GR-24.pdf",
    "S": "S"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SVT L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/SVT-L2-REMPL-1ER-GR-24.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SCPH L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/SCIENCES-PHYSIQUES-L2-REMPL-1ER-GR-24.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "LLA LA S1A S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/LLA-LAS1A-et-S2A-REMPL-1ER-GR-24.pdf",
    "S": "\"S1A"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "LLA L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/LLA-L-AR-1er-gr-rempl-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Maths L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/maths-l-ar-1er-rempl-1er-gr-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Maths L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Maths-l-1er-gr-rempl-24.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Francais S1AS2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/francais-s1a-s2a-rempl-24.pdf",
    "S": "\"S1A"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Francais S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/francais-s-rempl-1er-gr-24.pdf",
    "S": "S"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Maths STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/maths-steg-rempl-1er-gr-2024.pdf",
    "S": "STEG"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SVT S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/SVT-S2-1ER-GR-REMPL-24.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SVT S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/SVT-S1-1ER-GR-REMPL-24.pdf",
    "S": "S1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Italien LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ITALIEN-LV2-REMPL-1ER-GR-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Russe LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/russe-rempl-1er-ger-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Portugais LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/PORTUGAIS-LV2-1ER-GR-REMPL-1ER-GR-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Etud Islam",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ETUDES-ISLAMIQUES-1ER-GR-REMPL-24.pdf",
    "S": "NON_PRECISEE"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Espagnol LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ESPEGNOL-LV2-1ER-GR-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Economie L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ECONOMIE-L2.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Arabe LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ARABE-LV2-REMPL-1ER-GR-2024.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Angalais LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ANGL-LV2-1ER-REMPL-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Allemand LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ALLEMAND-LV2-1ER-GR-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Infor Gestion STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/INFORMATIQUE-DE-GESTION-REMPL-1ER-GR.pdf",
    "S": "STEG"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "HG L S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/H-G-REMPL-1er-gr-2024.pdf",
    "S": "\"S"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "HG L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/HG-L-AR-REMPL-1ER-GR-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Maths S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Maths-S2-1ER-REMPL-24.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Maths S1S3",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Maths-S1-S3-1-ER-GR.pdf",
    "S": "\"S1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Francais LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/francais-LA-1er-gr-rempl-2024.pdf",
    "S": "LA"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Francais L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/francais-L-1er-gr-rempl-2024.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Francais L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/2024GL42RA014801.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "PHILO STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Philo-STEG-1er-gr-2024.pdf",
    "S": "STEG"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "PHILO S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/PHILO-S-REMPL-1ER-24.pdf",
    "S": "S"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Espagnol LV1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/EPAGNOL-LV1-REMPL-1ER-GR.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Civilisation LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CIVILISATION-LA-REMPL-1ER-GR-24.pdf",
    "S": "LA"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Arabe LV1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ARABE-LV1-REMPL-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Anglais LV1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ANGLAIS-VL1-REMPL-1ER-GR.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SCPH S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/scien-ph-s1-s3-1er-gr-R-2024.pdf",
    "S": "S1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SCPH S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/SCI-PHY-S2-1er-gr-R-2024.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "PHILO L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/philo-l-ar-1er-gr-R-2024.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "PHILO L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/philo-L-1er-gr-R-2024.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "MATHS L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/maths-l-ar-1er-gr.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "MATHS L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Maths-L-1er-groupe.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "CIVIL S1A S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Civilsation-S1A-A2A-1ER-GR-.pdf",
    "S": "\"S1A"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS S3",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Anglais-S3.pdf",
    "S": "S3"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "LATIN L1A L1B",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/LATIN-1ER-GR-24.pdf",
    "S": "\"L1A"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS S1 S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Anglais-S1-S2-1ER-GR-24.pdf",
    "S": "\"S1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SCPH L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/SCIENECES-PHYSIQUES-L2-1ER-GR-24.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SVT L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/SVT-L2-1ER-GR.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "LLA L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/LLA-L-AR-1ER-GR-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "LLA S1A LA S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/LLA-LA-S1A-ET-S2A-1ER-GR-24.pdf",
    "S": "\"S1A"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "FRANCAIS S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Epreuve-S2A.pdf",
    "S": "S2A"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SVT S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/SVT-S1-1ER-GR-.pdf",
    "S": "S1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SVT S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/SVT-S2-1ER-GR-.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "CONST MECA S3",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Construction-S3-1er-gr-2024.pdf",
    "S": "S3"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ECONOMIE L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/ECONOMIE-L2-1ER-GR-.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "GREC",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Grec1er-gr-.pdf",
    "S": "NON_PRECISEE"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ARABE LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/arabe-lv2.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ESPAGNOL LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/espagnol-lv2-1er-gr-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ITALIEN LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Italien-lv2-1er-gr-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "PORTUGAIS LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/PORTUGAIS-LV2-1ER-GR-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "RUSSE LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/RUSSE-LV2-1ER-GR-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/anglais-lv2-1er-gr-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ALLEMAND LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/ALLEMAND-LV2-2024.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "CMC S4 S5",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CMC-1er-gr-S4-S5-2024.pdf",
    "S": "\"S4"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "AF TG AUTO S3",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/AF-TG-AUTO-1er-gr-S3-2024.pdf",
    "S": "S3"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "HG L S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/histo-geo-LS-1ER-GR-.pdf",
    "S": "\"S"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "HG L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/HG-L-AR-1ER-GR.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "MATHS S1S3",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/MATHS-S1S3.pdf",
    "S": "\"S1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "MATHS S2S4",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/MATHS-S2S4S5.pdf",
    "S": "\"S2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SCPH S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/epreuve-S1.pdf",
    "S": "S1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SCPH S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Epreuve-S2.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "PHILO L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/PHILOSOPHIE-L.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "PHILO L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/OHILO-LAR-1ER-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "FRANCAIS LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/FRANCAIS-LA.pdf",
    "S": "LA"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "FRANCAIS L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/FRANCAIS-LAR.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "FRANCAIS L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/FRANCAIS-L.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ALLEMAND LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/allemang-lv1-.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/anglais-lv1-1er-gr-.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/anglais-l-ar-1er-gr.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ARABE LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/arabe-lv1-1er-gr-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ESPAGNOL LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/espagnol-lv1-1er-gr-.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "PHIO S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/philo-s-1er-gr-.pdf",
    "S": "S"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "SVT L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/SVT-L2-2E-GR-REMPL-24.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Maths L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Maths-L-AR-2E-GR-REMPL-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "SCPH L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Sciences-Physiques-L2-REMPL-24.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Maths L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/MATHS-L-2E-GR-REMPL-24.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Portugais LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/PORTUGAIS-LV1-2E-GR-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "LLA LA SA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/LLA-LA-SA-2E-GR-REMPL-24.pdf",
    "S": "LA"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "LLA L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/LLA-L-AR-2E-GR-REMPL-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Espagnol LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ESPAGNOL-LV1-REMPL-2E-GR-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Arabe LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ARABE-LV1-2E-GR-REMPL-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Anglais LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ANGLAIS-LV1-2E-GR-REMPL-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "SVT S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/SVT-S2-2E-GR-24.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Science Eco STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/SCIENCES-ECO-ET-SOCIALES-STEG-2E-GR-24.pdf",
    "S": "STEG"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Francais L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/FRANCAIS-L-2E-GR-24.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "etud Isl",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/etudes-islamiques.pdf",
    "S": "NON_PRECISEE"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "SCPH S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/sciences-physiques-s-2e-gr.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Russe LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/RUSSE-LV2-2E-GR-REMPL-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Portugais LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/PORTUGAIS-LV2-2E-GR-REMPL-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Maths STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Maths-steg.pdf",
    "S": "STEG"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Francais LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/FRANCAIS-LA-2E-GR-REMPL-24.pdf",
    "S": "LA"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Espagnol LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ESPAGNOL-LV2-2E-GR-2024-REMPL.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Economie L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Economie-L2.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Arabe LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ARABE-LV2-REMPL-2E-GR-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Anglais LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ANGLAIS-LV2-REMPL-2E-GR-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "ALLEMAND LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/ALLEMAND-LV-2-2E-GR-REMPL.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Anglais L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/anglais-l-ar-2e-gr-rempl-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "GestCompt STE G2ndGr",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Epreuve-Gestion-compt-STEG.pdf",
    "S": "NON_PRECISEE"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "MATHS S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Epreuve-MATHS-S2.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "PHILO L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Epreuve-philo-L.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "PHILO L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/philo-l-ar-2e-gr-rempl-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Espagnol STIDD",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/corrige-esp-stid-rempl-1er-gr-24.pdf",
    "S": "STIDD"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Manag Org STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-management-des-organisations.pdf",
    "S": "STEG"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Anglais S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRRIGE-ANG-S-1ER-REMPL-24.pdf",
    "S": "S"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Anglais STEG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/corrige-anglais-steg-rempl-1er-gr-24.pdf",
    "S": "STEG"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SVT L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-SVT-L2-REMPL-1ER-GR-24.pdf",
    "S": "L2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SCPH L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-SCIENCES-PHYSIQUES-L2-REMPL-24.pdf",
    "S": "L2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Francais S1A S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/corrige-fre-s1a-s2a.pdf",
    "S": "\"S1A"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Italien LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/corrige-italien-lv2-1er-gr-rempl-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SVT S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-SVT-S1.pdf",
    "S": "S1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SVT S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-SVT-S2-REMPL-24.pdf",
    "S": "S2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Espagnol LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-ESP-LV2-1ER-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Italien LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-ITALIEN-LV2.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Portugais LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-PORT-LV2-1ER-GR-REMPL-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Arabe LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-ARABE-LV2-REMPL-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Anglais LVII",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-ANGL-LV2-1ER-GR-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Maths S1S3",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Corrige-MATHS-S1-S3-1ER-Gr-rempl.pdf",
    "S": "\"S1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Francais LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/corrige-fr-LA-1ER-GR-REMPL-24.pdf",
    "S": "LA"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Espagnol LV1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Corrige-esp-LV1-Rempl-1er.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Arabe LV1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-ARABE-LV1-REMPL-1ER-GR.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Anglais LV1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-AANGLAIS-LV1-REMPL-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "Portugais LV1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIG2-PORTUGAIS-LV1-REMPL-1ER-GR-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SCPH S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Corrige-sc-phy-S1-1er-groupe-1.pdf",
    "S": "S1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Octobre",
    "L": "SCPH S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/Corrige-sc-ph-Ssujet-2_S2-2.pdf",
    "S": "S2"
  },
  {
    "T": "Grille",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "CIVIL S1A S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Grille-de-Correction-Civilastion-et-Etudes-Islamiques.pdf",
    "S": "\"S1A"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS S3",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Corrige-Anglais-S3.pdf",
    "S": "S3"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "LATIN L1A L1B",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-LATIN-1ER-GR-24.pdf",
    "S": "\"L1A"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS S1 S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-anglais-s1-s2-1er-gr-2024.pdf",
    "S": "\"S1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "LLA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRGIGE-LLA-L-AR-LA-S1A-ET-S2A.pdf",
    "S": "NON_PRECISEE"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "FRANCAIS LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-FRANCAIS-LA.pdf",
    "S": "LA"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SCPH L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-SCPH-L2.pdf",
    "S": "L2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SVT L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Corrige-svt-l2-1er-gr_V.pdf",
    "S": "L2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "FRANCAIS S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-S2A-1ER-GR.pdf",
    "S": "S2A"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "FRANCAIS S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-FRANCAIS-1er-GR-S1-S2-S3-S4-S5.pdf",
    "S": "S"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "CONS MECA S3",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Corrige-CMECA-S3-2024.pdf",
    "S": "S3"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SVT S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/svt-s2-1er-gr-corrige_V.pdf",
    "S": "S2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SVT S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/svt-s1-corrige-_V.pdf",
    "S": "S1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "RUSSE LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-russe-lv2-1er-gr.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "PORTUGAIS LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/PORTUGAIS-LV2-2024.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-angl-lv2-1er-gr-1.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ITALIEN LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Corrige-Italien-LV2-1ER-GR.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ESPAGNOL LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-esp-lv2-1er-gr.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ARABE LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-arabe-lv2-1er-gr.pdf",
    "S": "LV2"
  },
  {
    "T": "Grille",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "HG L S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Grille-HG-Bac-2024.pdf",
    "S": "\"S"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "MATHS S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Corrige_MATHS-S2.pdf",
    "S": "S2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "MATHS S1S3",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Corrige_MATHS-S1S3-1.pdf",
    "S": "\"S1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SCPH S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-PC-S2.pdf",
    "S": "S2"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "SCPH S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Corrige-du-PC-S1.pdf",
    "S": "S1"
  },
  {
    "T": "Canevas",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "Philo S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Canevas-Bac-S-philo-2024.pdf",
    "S": "S"
  },
  {
    "T": "Canevas",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "Philo",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Canevas-Bac-philo-2024.pdf",
    "S": "NON_PRECISEE"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-ang-lv1-1er-gr.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ANGLAIS L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-ang-l-ar-01a.pdf",
    "S": "L-AR"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ARABE LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-arabe-lv1-01a-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "ESPAGNOL LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-espagnol-lv1-1er-gr-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "PORTUGAIS LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-lv1-1er-gr-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "FRANCAIS L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-FRANCAIS-LAR.pdf",
    "S": "L-AR"
  },
  {
    "T": "Corrigé",
    "G": "1er groupe",
    "M": "Juillet",
    "L": "FRANCAIS L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGES-EPREUVES_PREMIER-GROUPE-FRANCAIS-SERIES-L.pdf",
    "S": "L"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Anglais LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-ANGL-LV1-2E-GR-REMPL-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Arabe LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-ARABE-LV1-2E-GR-REMPL-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Francais LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-FRANACAIS-LA-ERLMPL-2E-GR-24.pdf",
    "S": "LA"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Portugais LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-PORTUGAIS-LV1-2E-GR-REMPL-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "LLA L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-LLA-L-AR-REMPL-2E-GR-24.pdf",
    "S": "L-AR"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "LLA LA SA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/corrige-LLA-LA-SA-2E-GR-24.pdf",
    "S": "LA"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Espagnol LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-ESP-LV1-REMPL-2E-GR-24.pdf",
    "S": "LV1"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "SVT S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-SVT-S2-2E-GR-24.pdf",
    "S": "S2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Francais L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/corrige-fr-L-2E-GR-24.pdf",
    "S": "L"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Anglais L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/corrige-anglais-l-ar-2e-gr.pdf",
    "S": "L-AR"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Portugais LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-PORT-LV2-REMPL-2E-GR-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Russe LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-RUSSE-LV2-REMPL-2E-GR.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Arabe LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-LV2-ARABE-REMPL-2-EGR-24.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Octobre",
    "L": "Espagnol LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/10/CORRIGE-ESPAGNOL-LV2-REMPL-2R-GR.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "PHILO L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/philo-l-ar-2r-gr.pdf",
    "S": "L-AR"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SVT L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-svt-L2-2E-GR.pdf",
    "S": "L2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SCPH L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Corrige-L2_2024_2e-groupe.pdf",
    "S": "L2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SVT S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige_SVT_S2_G2_2024.pdf",
    "S": "S2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-FR-L-2E-GR.pdf",
    "S": "L"
  },
  {
    "T": "Grille",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "HG",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Grill-HG-2024-2eme-groupe.pdf",
    "S": "NON_PRECISEE"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SVT S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/svt-s1-2e-gr-2024_corrige.pdf",
    "S": "S1"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS S1A S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-FR-S1A-S2A.pdf",
    "S": "\"S1A"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-FR-S-2E-GR.pdf",
    "S": "S"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SCPH S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Corrige-Scienes-Physiques-S_2024_-2e-groupe.pdf",
    "S": "S"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIFE-FRANCAIS-L-AR-2E-GR.pdf",
    "S": "L-AR"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ESPAGNOL LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-ESP-LV2-2-EGR.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-FR-LA-2E-GR.pdf",
    "S": "LA"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ITALIEN LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-ITALIEN-LV2.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ARABE LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/corrige-lv2-Arabe-2R-GR.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "PORTUGAIS LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-PORT-LV2-2E-GR.pdf",
    "S": "LV2"
  },
  {
    "T": "Corrigé",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "RUSSE LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/CORRIGE-RUSSE-LV2-2E-GR.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SVT L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/SVT-L2-2E-GR-.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "MATHS L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/MATHS-L-AR-2E-GR.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "MATHS L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/MATHS-L-2E-GR-.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SCPH L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Sujet-L2_2024_2e-groupe-1.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "LLA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/LLA-2e-gr-LA-S1A-et-S2A.pdf",
    "S": "NON_PRECISEE"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ESPAGNOL LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/espagnol-lv1-2e-gr-.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ARABE LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/arabe-lv1-2e-gr-.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ANGLAIS LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/anglais-lv1-2e-gr.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ALLEMAND LVI",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/allemand-lv1.pdf",
    "S": "LV1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SVT S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/svt-s2-2e-gr.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/francais-L-2e-gr.pdf",
    "S": "L"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ETUDISLM",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/ETUDES-ISLAMIQUES-2E-GR.pdf",
    "S": "NON_PRECISEE"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SVT S1",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/SVT-S1-2E-GR.pdf",
    "S": "S1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "SCPH S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/SCIENCES-PHYSIQUES-S-2E-GR-.pdf",
    "S": "S"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "PHILO S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/PHILO-S-2E-GR-.pdf",
    "S": "S"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "HIST GEO L S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/HISTO-GEO-L-S-2E-GR-.pdf",
    "S": "\"S"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "HIST GEO L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/HISTO-GEO-L-AR-2E-GR-.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS S1A S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/FRANCAIS-S1A-S2A-2E-GR-.pdf",
    "S": "\"S1A"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS S",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/FRANCAIS-S-2E-GR-.pdf",
    "S": "S"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "RUSSE LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/RUSSE-LV2-2E-GR-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ITALIEN LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/PORT-LV2-2E-GR-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ITALIEN LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/ITALIEN-LV2-2E-GR-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "GREC L1A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/GREC-2E-GR.pdf",
    "S": "L1A"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS L AR",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/FRAN-L-AR-2E-GR-.pdf",
    "S": "L-AR"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "FRANCAIS LA",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/FR-LA-2E-GR-24.pdf",
    "S": "LA"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ESPAGNOL LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/ESP-LV2-2E-GR-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ECONOMIE L2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/ECONOMIE-L2-2E-GR.pdf",
    "S": "L2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "ARABE LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/ARABE-LV2-2E-GR.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "Allemand LV2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/ALLEMAND-LV2-2E-GR-.pdf",
    "S": "LV2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "MATHS S1 S1A S2A",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/maths-s1-s1a-s2a-2e-gr-.pdf",
    "S": "\"S1"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "MATHS S2",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/maths-s2-2e-gr.pdf",
    "S": "S2"
  },
  {
    "T": "Épreuve",
    "G": "2nd groupe",
    "M": "Juillet",
    "L": "PHILO L",
    "U": "https://officedubac.sn/wp-content/uploads/2024/07/Philio-L-2e-gr.pdf",
    "S": "L"
  }
];

// ─── Mapping Libellé → subjectName ──────────────────────────────────────────
function detectSubject(libelle) {
    const l = libelle.trim().toUpperCase();
    if (/\bMATHS?\b/.test(l) || l.startsWith('MATH')) return 'Mathématiques';
    if (/\bSVT\b/.test(l)) return 'SVT';
    if (/\bSCPH\b/.test(l) || /\bSC[\s-]?PH\b/.test(l)) return 'Physique';
    if (/\bANGLAIS\b/.test(l) || /\bANGL?\b/.test(l)) return 'Anglais';
    if (/\bFRANCAIS\b/.test(l) || /\bFRANC?\b/.test(l)) return 'Français';
    if (/\bPHILO\b/.test(l)) return 'Philosophie';
    if (/\bHG\b/.test(l) || /\bHIST[\s-]?GEO\b/.test(l) || /\bHISTOIRE\b/.test(l)) return 'Histoire-Géographie';
    if (/\bECO(NOMIE)?\b/.test(l)) return 'Économie';
    if (/\bDROIT\b/.test(l)) return 'Droit';
    if (/\bCOMPTA\b/.test(l) || /\bCOMPT/.test(l)) return 'Comptabilité';
    if (/\bINFOR(MATIQUE)?\b/.test(l)) return 'Informatique';
    if (/\bARABE\b/.test(l)) return 'Arabe';
    if (/\bESPAGNOL\b/.test(l)) return 'Espagnol';
    if (/\bLLA\b/.test(l) || /\bLITT\b/.test(l)) return 'Littérature';
    if (/\bCIV\b/.test(l) || /\bCIVIL\b/.test(l)) return 'Civilisation';
    if (/\bMANAG\b/.test(l) || /\bMAN[GA]+\b/.test(l) || /\bORG\b/.test(l)) return 'Gestion';
    if (/\bPHYS\b/.test(l)) return 'Physique';
    return null;
}

const SERIES_NORM = { L: ['L1'], S: ['S1', 'S2'] };
const HANDLED_SERIES = new Set(['S1', 'S2', 'L1', 'L2', 'STEG']);

function parseSeries(seriesStr) {
    const raw = (seriesStr || '').replace(/"/g, '').split(',').map((s) => s.trim()).filter(Boolean);
    const expanded = [];
    for (const s of raw) {
        if (SERIES_NORM[s]) expanded.push(...SERIES_NORM[s]);
        else expanded.push(s);
    }
    return [...new Set(expanded)];
}

const SUBJECT_DURATION = {
    'Mathématiques': 240, 'Physique': 180, 'SVT': 180, 'Anglais': 120,
    'Français': 180, 'Philosophie': 180, 'Histoire-Géographie': 180,
    'Économie': 180, 'Droit': 180, 'Comptabilité': 180, 'Informatique': 120,
};

function normalizeLibelle(lib) {
    return lib.trim().toUpperCase().replace(/\s+/g, ' ').replace(/[^A-Z0-9 ]/g, '');
}

async function seedAnnales() {
    const epreuves = MANIFEST.filter((e) => e.T === 'Épreuve');
    const corriges = MANIFEST.filter((e) => e.T === 'Corrigé');
    console.log(`📚 Manifest embarqué: ${MANIFEST.length} entrées | ${epreuves.length} épreuves | ${corriges.length} corrigés`);

    await testDatabaseConnection();
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Charger les matières
        const subjectsRes = await client.query('SELECT id, serie_code, name FROM subjects ORDER BY serie_code, name');
        const subjectIndex = {};
        for (const s of subjectsRes.rows) subjectIndex[`${s.serie_code}:${s.name}`] = s;
        console.log(`🔍 ${subjectsRes.rows.length} matières en base`);

        // Supprimer anciens chapitres annales 2024
        const existingRes = await client.query("SELECT id FROM chapters WHERE title = 'Annales 2024'");
        if (existingRes.rows.length > 0) {
            console.log(`♻️  Suppression de ${existingRes.rows.length} chapitres annales existants…`);
            for (const { id } of existingRes.rows) {
                await client.query('DELETE FROM daily_tasks WHERE chapter_id=$1', [id]);
                await client.query('DELETE FROM chapter_progress WHERE chapter_id=$1', [id]);
                await client.query('DELETE FROM ai_sessions WHERE chapter_id=$1', [id]);
                await client.query('DELETE FROM student_performances WHERE chapter_id=$1', [id]);
                await client.query('DELETE FROM exercises WHERE chapter_id=$1', [id]);
            }
            await client.query("DELETE FROM chapters WHERE title = 'Annales 2024'");
        }

        const annaleChapterMap = {};
        async function getOrCreateAnnaleChapter(subjectId) {
            if (annaleChapterMap[subjectId]) return annaleChapterMap[subjectId];
            const chId = uuidv4();
            const orderRes = await client.query(
                'SELECT COALESCE(MAX(order_index), 0) + 1 AS next FROM chapters WHERE subject_id=$1', [subjectId],
            );
            await client.query(
                `INSERT INTO chapters (id, subject_id, title, summary, order_index, is_published)
                 VALUES ($1, $2, 'Annales 2024', 'Sujets officiels du BAC 2024 avec corrigés.', $3, true)`,
                [chId, subjectId, orderRes.rows[0].next],
            );
            annaleChapterMap[subjectId] = chId;
            return chId;
        }

        // Index corrigés
        const corrigeByKey = {};
        for (const c of corriges) {
            const key = `${normalizeLibelle(c.L)}|${c.G}|${c.M}`;
            if (!corrigeByKey[key]) corrigeByKey[key] = [];
            corrigeByKey[key].push(c);
        }

        console.log('\n📝 Insertion des annales…');
        let inserted = 0, skipped = 0;

        for (const ep of epreuves) {
            const series = parseSeries(ep.S).filter((s) => HANDLED_SERIES.has(s));
            if (series.length === 0) { skipped++; continue; }

            const subjectName = detectSubject(ep.L);
            if (!subjectName) {
                console.log(`   ⚠️  Matière inconnue: "${ep.L}" – ignoré`);
                skipped++;
                continue;
            }

            const corrigeKey = `${normalizeLibelle(ep.L)}|${ep.G}|${ep.M}`;
            const corrigeUrl = corrigeByKey[corrigeKey]?.[0]?.U ?? null;
            const session = `${ep.G} – ${ep.M} 2024`;
            const duration = SUBJECT_DURATION[subjectName] ?? 180;
            const questionText = `Épreuve officielle du BAC 2024 – ${ep.L.trim()} (${ep.G}, session de ${ep.M}).`;

            for (const serieCode of series) {
                const subject = subjectIndex[`${serieCode}:${subjectName}`]
                    ?? subjectsRes.rows.find((s) => s.serie_code === serieCode && s.name.toLowerCase().includes(subjectName.toLowerCase().split(' ')[0]));

                if (!subject) {
                    console.log(`   ⚠️  "${subjectName}" introuvable pour série ${serieCode} – ignoré`);
                    skipped++;
                    continue;
                }

                const chapterId = await getOrCreateAnnaleChapter(subject.id);
                await client.query(
                    `INSERT INTO exercises
                     (id, chapter_id, subject_id, type, difficulty, title, question_text,
                      explanation, hints, is_annale, annale_year, annale_session,
                      estimated_time_minutes, points, pdf_url, corrige_url, is_published)
                     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
                    [
                        uuidv4(), chapterId, subject.id, 'dissertation', 4,
                        `${ep.L.trim()} – BAC 2024`, questionText,
                        corrigeUrl ? 'Corrigé officiel disponible en téléchargement.' : 'Corrigé non disponible pour cette session.',
                        JSON.stringify([]), true, 2024, session, duration, 50,
                        ep.U, corrigeUrl,
                        true,
                    ],
                );
                inserted++;
            }
        }

        await client.query('COMMIT');
        console.log(`\n✅ Import terminé !`);
        console.log(`   ${inserted} annales insérées`);
        console.log(`   ${Object.keys(annaleChapterMap).length} chapitres "Annales 2024" créés`);
        console.log(`   ${skipped} épreuves ignorées`);

    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

seedAnnales()
    .catch((err) => { console.error('❌ Échec:', err); process.exitCode = 1; })
    .finally(() => pool.end());
